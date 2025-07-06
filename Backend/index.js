require('dotenv').config();
const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt')
const authenticator = require('./middleware/authenticator')
const DBconn = require('./connDB/connDB')
const getAccessToken = require('./jwt/getAccessToken')
const refreshToken = require('./jwt/refreshToken')
const deleteRefreshToken = require('./jwt/deleteRefreshToken')
const signupValidator = require('./middleware/signupvalidator')
const adminAuthoriser = require('./middleware/adminauthoriser')
const cookieParser = require('cookie-parser');
const verifyLevelChat = require('./middleware/verifylevelchat')
const verifyWSLevelChat = require('./middleware/verifyWSLevelChat')
const http = require("http")
const WebSocket = require("ws")


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
let connection;

let users = {
  'customer':[],
  'admin':[]
};
// app.use((req,res)=>{
//   console.log(req);
// })

const allowedOrigins = [
  'https://washingmachine-phi.vercel.app',
];


app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    const isAllowed = !origin || allowedOrigins.includes(origin);
    callback(null, isAllowed);
  }
}));

app.use(cookieParser())

function wait(x){
  return new Promise(resolve => {setTimeout(()=>{resolve()},x*1000)})
}


function pricingGrouper(priceData){
  let answer = {}
  priceData.forEach(priceItem => {
    if(!answer?.[priceItem.service_name]){
      answer[priceItem.service_name] = []
    }
    answer[priceItem.service_name].push(priceItem)
  })
  return answer
}
//can be an uprotected route
app.get('/pricing', async (req, res) => {
  try{
    // await wait(3);
    let [priceItems,priceItemsField] = await connection.query("SELECT * FROM price");
    let answer = pricingGrouper(priceItems)
    res.send(answer)
  }catch(err){
    console.error('Error querying the database:', err);
    if(!res.headersSent){
      res.status(500).send(err.message);
    }
  }
});

// protected route
app.post('/billing',adminAuthoriser,async(req,res)=>{
  console.log('billing recieved',req.query)
  let bill = req.body;
  try{
    //first update the services table 
    const [serviceRows,serviceFields] = await connection.query("INSERT INTO `service` (`customer_id`,`totalPrice`) VALUES (?,?)",[bill.customer_id,bill.total_price])

    //then insert into the service details tbale
    const serviceDetails = bill.serviceDetails; // Array of objects

    //first we would need to create the service details query from user's price object
    const values = [];
    const placeholders = Object.keys(serviceDetails).map(service => {
      return serviceDetails[service].filter(cloth => cloth.quantity>0).map(cloth => {
        if(cloth['quantity']>0){
          values.push(serviceRows.insertId, cloth.price_id, cloth.quantity);
          return '(?,?,?)';
        }else{
          return '';
        }
      }).join(',')
    }).join(',')
    console.log("placeholders",placeholders);
    const serviceDetailsSql = `INSERT INTO service_details (service_id,price_id,quantity) VALUES ${placeholders}`;

    const [serviceDetailsrows,serviceDetailsField] = await connection.execute(serviceDetailsSql, values);
    console.log("inside the billing api .Service details ",values)   
    
    // console.log(result)
    res.status(200).send("Service recorded successfully");
    
  }catch(err){
    console.log("error in inserting service into db",bill,err);
    if(!res.headersSent){
      res.status(500).send(err.message)
    }
  }
})

// all the auth related endpoints must have req.body.role 

app.post('/signup',signupValidator,(req,res)=>{
  console.log("signup requested");
  let user = req.body;
  bcrypt.hash(user.password,10,async function(err,hash){
    if(err){
      return res.status(500).send("There was an error in our server.Please try signing up again")
    }
    try{
        switch(user.role){
          case 'customer':{
            const [results,fields] = await connection.query("INSERT INTO `customer` (`name`,`phone`,`email`,`password`) VALUES (?,?,?,?)",[user.name,user.phone,user.email,hash])
            res.status(200).send("User account created successfully");
          }
          case 'admin':{
            const [results,fields] = await connection.query("INSERT INTO `admintable` (`name`,`phone`,`password`,`email`) VALUES (?,?,?,?)",[user.name,user.phone,hash,user.email])
            res.status(200).send("Admin account created successfully");
          }
        }
    }catch(error){
        console.log("error in creating",user.role,"account",user.name,user?.email,user.phone,error)
        res.status(500).send("There was an error in our server.Please try again")
    }
  })
})


app.post('/login',authenticator,getAccessToken,(req,res)=>{
  let response = {
    "authData": req.loginData,
    "profileData": req.Profile
  };
  console.log('completed login')
  // console.log("user id ",req.userProfile.customer_id)
  res.send(response);
})

app.post('/refresh',refreshToken,(req,res)=>{
  let response = {
    "authData": req.refreshData
  }
  res.send(response)
})

app.post('/logout',deleteRefreshToken,(req,res)=>{
  res.send('Successfully logged out');
})

// need to write the update user functionality
app.get('/chathistory',verifyLevelChat,async(req,res)=>{
  console.log("tried to get chat history",req.query);
  let result,field;
  try{
    if(req.role == 'admin'){
      [result,field] = await connection.query('SELECT * from `chat`')
    }else if(req.role == 'customer'){
      [result,field] = await connection.query('SELECT * from `chat` WHERE customer_id = ?',[req.query.customer_id])
      console.log('tried to get chat history customer id: ',req.query.customer_id)
    }
    res.send(result)
  }catch(err){
    console.log("error while getting chat data",err);
    res.sendStatus(500)
  }
})


function broadcast(message){
  users.forEach(userWSObject => {
    userWSObject.send(message);
  })
}

function SQLfomratDate(){
  let hold = new Date()
  return hold.getFullYear() + '-' + (Number(hold.getMonth())+1).toString().padStart(2,0) + '-' + hold.getDate().toString().padStart(2,0)
}

function timeGetter(){
  return new Date().toString().split(' ')[4]
}

function messagewrapper(message,purposeofmessage){
  return JSON.stringify({
    'purpose':purposeofmessage,
    'content':message
  })
}

wss.on('connection',(ws)=>{
  console.log("connected user","admin:",users["admin"].length,"customer:",users["customer"].length)
  ws.send(messagewrapper('ready to chat','connect'));

  //message.body,message.auth,message.id

  ws.on('message',async(originalmessage)=>{
    try{
      // console.log("original message recieved: ",originalmessage)

      //parse the msg
      let message = JSON.parse(originalmessage)
      let messagepurpose = message?.purpose
      message = message?.content
      // message.body = message.body.toString();
      console.log(message);

      //verify jwt
      let verifiedOrNot = await verifyWSLevelChat(message.auth)
      console.log('verifiedorNot',verifiedOrNot,Boolean(verifiedOrNot))
    
      if(verifiedOrNot && verifiedOrNot !='Token expired'){ 
        // console.log("message body:",message.body)

        if(messagepurpose == 'connect'){

          ws.id = message.id
          ws.auth = verifiedOrNot
          users[verifiedOrNot].push(ws)
          console.log(verifiedOrNot,'with',message.id,'has connected',ws.id)

        }else if(messagepurpose == 'readornotupdate'){

          let messagecontent = message.body;

          connection.query("UPDATE `chat` SET `readornot`=1 WHERE messageid IN ?",[messagecontent.messageid])

          let sendobject = {
            'customer_id':messagecontent.customer_id,
            'messageid':messagecontent.messageid
          }

          if(verifiedOrNot=='customer'){

            users['admin'].forEach(adminWS => {
              adminWS.send(messagewrapper(sendobject,'readornotupdate'))
            })

          }else if(verifiedOrNot == 'admin'){

            let foundCustomer = users["customer"].find(customerWS => customerWS.id == messagecontent.customer_id);
            foundCustomer.send(messagewrapper(sendobject,'readornotupdate'));

          }

        }else if(messagepurpose == 'normalmessage'){
          let message_date = SQLfomratDate()
          let message_time = timeGetter()
          if(verifiedOrNot == 'customer'){

            let [result,field] = await connection.query("INSERT INTO `chat` (`chat_message`,`sender`,`reciever`,`message_time`,`message_date`,`readornot`,`customer_id`,`customer_name`) VALUES (?,?,?,?,?,'0',?,?)",[message.body,'customer','admin',message_time,message_date,ws.id,message.name]);

            let sendmessage = {
                'messageid':result?.insertid,
                'chat_message':message.body,
                'sender':'customer',
                'reciever':'admin',
                'message_time':message_time,
                'message_date':message_date,
                'readornot':0,
                'customer_name':message.name,
                'customer_id':ws.id
            }
            
            ws.send(messagewrapper(sendmessage,'messagesendconfirmation'))

            users["admin"].forEach(adminWS => {
              adminWS.send(messagewrapper(sendmessage,'normalmessage'))
            })
            
          }else if(verifiedOrNot == 'admin'){

            let [result,field] = await connection.query("INSERT INTO `chat` (`chat_message`,`sender`,`reciever`,`message_time`,`message_date`,`readornot`,`customer_id`,`customer_name`) VALUES (?,?,?,?,?,'0',?,?)",[message.body,'admin','customer',message_time,message_date,message.recieverid,message.recieverName]);

            let sendmessage = {
              'messageid':result?.insertid,
              'chat_message':message.body,
              'sender':'admin',
              'reciever':'customer',
              'message_time':message_time,
              'message_date':message_date,
              'readornot':0,
              'customer_id':message.recieverid,
              'customer_name':message.recieverName
            }

            users['admin'].forEach(adminWS => {
              adminWS.send(messagewrapper(sendmessage,'messagesendconfirmation'))
            })

            let foundCustomer = users["customer"].find(customerWS => customerWS.id == message.recieverid);
            // console.log('foundCustomer',foundCustomer)
            foundCustomer?.send(messagewrapper(sendmessage,'normalmessage'))
            
          }
        }else{
          console.log("message with no purpose",message)
        }
        console.log('message was sent successfully',message)
      }else{
        console.log("unauthenticated/unauthorized message recieved");
        ws.send(messagewrapper("unauthenticated/unauthorized message recieved"),'error - no proper authetication/authorization')
      }
      
    }catch(err){
      console.log("When trying to send message.Error occured: ",err)
    }
  })

  ws.on('close',()=>{
    if(ws.auth == 'admin'){
      users.admin = users.admin.filter(adminWS => adminWS.id != ws.id )
    }else if(ws.auth == 'customer'){
      users.customer = users.customer.filter(customerWS => customerWS.id != ws.id)
    }
  })

})

server.listen(process.env.PORT, async() => {
  console.log('Server is running at port 3000');
  connection =  await DBconn();
});



