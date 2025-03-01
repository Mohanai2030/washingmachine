const jwt = require('jsonwebtoken')
const DBconn = require('../connDB/connDB')
require('dotenv').config()

const getAccessToken = async(req,res,next)=>{
    let connection = await DBconn('setting refresh token');

    switch(user?.role){
        case 'customer':{
            const refreshToken = jwt.sign({
                "name":req.body.username,
                "role":'customer'
            },
            process.env.REFRESH_TOKEN_KEY,
            {expiresIn: '1d'}
            )
        
            const accessToken = jwt.sign({
                "name":req.body.username,
                "role":'customer'
            },
            process.env.ACCESS_TOKEN_KEY,
            {expiresIn: '3600s'}
            )
        
            let message = {
                "accessToken":accessToken,
                "roles":[1000]
            }
        
            try{
                let [results,fields] = await connection.query("INSERT INTO customer_login (`customer_id`,`refresh_token`) VALUES (?,?)",[req.Profile.customer_id,refreshToken])
                res.cookie('jwt',refreshToken,{expiresIn : 24 * 60 * 60 * 1000})
                req.loginData = message;
                next();
            }catch(err){
                res.status(500).send("There was an error when trying to complete the login process.Please try to login again.")
            }
        }case 'admin':{
            const refreshToken = jwt.sign({
                "name":req.body.username,
                "role":'admin'
            },
            process.env.REFRESH_TOKEN_KEY,
            {expiresIn: '1d'}
            )
        
            const accessToken = jwt.sign({
                "name":req.body.username,
                "role":'admin'
            },
            process.env.ACCESS_TOKEN_KEY,
            {expiresIn: '1800s'}
            )
        
            let message = {
                "accessToken":accessToken,
                "roles":[2000]
            }
        
            try{
                let [results,fields] = await connection.query("INSERT INTO admin_login (`customer_id`,`refresh_token`) VALUES (?,?)",[req.Profile.admin_id,refreshToken])
                res.cookie('jwt',refreshToken,{expiresIn : 24 * 60 * 60 * 1000})
                req.loginData = message;
                next();
            }catch(err){
                res.status(500).send("There was an error when trying to complete the login process.Please try to login again.")
            }
        }
    }
    
}

module.exports = getAccessToken