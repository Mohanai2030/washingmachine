require('dotenv').config();
const mysql = require('mysql2/promise');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const authenticator = require('./middleware/authenticator')
const DBconn = require('./connDB/connDB')
const getAccessToken = require('./jwt/getAccessToken')
const refreshToken = require('./jwt/refreshToken')


let connection;

app.use(express.json());

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

app.post('/signup',(req,res)=>{
  let user = req.body.user;
  bcrypt.hash(user.password,10,async function(err,hash){
    if(err){
      return res.status(500).send("There was an error in our server.Please try signing up again")
    }
    try{
      const [results,fields] = await connection.query("INSERT INTO `customer` (`name`,`phone`,`email`,`password`) VALUES (?,?,?,?)",[user.name,user.phone,user.email,hash])
      res.status(200).send("User account created successfully");
      if(results.affectedRows!=1){
        console.log(results.affectedRows," were affected by the service ",service);  
      }
    }catch(error){
      console.log("error in creating user account",user.name,user.email,user.phone,err)
      res.status(500).send("There was an error in our server.Please try again")
    }
  })
})

app.post('/login',authenticator,getAccessToken,(req,res)=>{
  let response = {
    "authData": req.loginData,
    "userData": req.userProfile
  };
  console.log("user id ",req.userProfile.customer_id)
  res.send(response);
})

app.get('/refresh',refreshToken,(req,res)=>{
  let response = {
    "authData": req.refreshData
  }
  res.send(response)
})

app.get('/logout',deleteRefreshToken,(req,res)=>{
  res.send('Successfully logged out');
})


app.listen(3000, async() => {
  console.log('Server is running at port 3000');
  connection =  await DBconn();
});


