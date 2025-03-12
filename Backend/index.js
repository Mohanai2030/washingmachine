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
const http = require("http")
const WebSocket = require("ws")


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
let connection;

let users = [];
// app.use((req,res)=>{
//   console.log(req);
// })
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}))

//can be an uprotected route
app.get('/pricing', async (req, res) => {
  let answer = {}
  try{
    let [normalwash,normalwashField] = await connection.query("SELECT * FROM price WHERE service_name='normalwash'");
    let [drywash,drywashField] = await connection.query("SELECT * FROM price WHERE service_name='drywash'")
    let [ironing,ironingField] = await connection.query("SELECT * FROM price WHERE service_name='ironing'")
    answer['normalwash'] = normalwash;
    answer['drywash'] = drywash;
    answer['ironing'] = ironing;
    res.send(answer)
  }catch(err){
    console.error('Error querying the database:', err);
    res.sendStatus(500).send(err.message);
  }
});

// protected route
app.post('/service',async(req,res)=>{
  console.log('post request recieved',req.query)
  let service = req.body.service;
  try{
    const [result,fields] = await connection.query("INSERT INTO `service` (`customer_id`,`service_date`,`total_clothes`,`shirts`,`pants`,`bedsheets`,`t_shirts`,`shorts`,`innerwear`,`socks`,`total_price`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",[service.customer_id,`2024-12-24`,service.total_clothes,service.shirts,service.pants,service.bedsheets,service.t_shirts,service.shorts,service.innerwear,service.socks,service.total_price])
    console.log(result)
    res.status(200).send("Service recorded successfully");
    if(result.affectedRows!=1){
      console.log(result.affectedRows," were affected by the service ",service);  
    }
  }catch(err){
    console.log("error in inserting service",service,err);
    res.status(500).send(err.message)
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
            const [results,fields] = await connection.query("INSERT INTO `admintable` (`name`,`phone`,`password`,`email`) VALUES (?,?,?)",[user.name,user.phone,hash,user.email])
            res.status(200).send("Admin account created successfully");
          }
        }
    }catch(error){
        console.log("error in creating",user.role,"account",user.name,user?.email,user.phone,err)
        res.status(500).send("There was an error in our server.Please try again")
    }
  })
})


app.post('/login',authenticator,getAccessToken,(req,res)=>{
  let response = {
    "authData": req.loginData,
    "profileData": req.Profile
  };
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
function broadcast(message){
  users.forEach(userWSObject => {
    userWSObject.send(message);
  })
}

wss.on('connection',(ws)=>{
  console.log("connected user")
  users.push(ws);
  ws.send('ready to chat');

  ws.on('message',async(originalmessage)=>{
    try{
      let message = originalmessage.toString()
      console.log('message',message)
      broadcast(message)
      await connection.query("INSERT INTO `chat` (`chat_message`,`message_time`,`sender`,`reciever`) VALUES (?,'2025-03-12 00:03:40','customer','admin')",[message]);
    }catch(err){
      console.log("When trying to send message.Error occured: ",err)
    }
  })
})

server.listen(3000, async() => {
  console.log('Server is running at port 3000');
  connection =  await DBconn();
});



