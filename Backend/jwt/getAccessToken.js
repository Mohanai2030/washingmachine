const jwt = require('jsonwebtoken')
const DBconn = require('../connDB/connDB')
require('dotenv').config()

const getAccessToken = async(req,res,next)=>{
    let connection = await DBconn('setting refresh token');
    let user = req.body;
    // console.log("user:",user)
    switch(user?.role){
        case 'customer':{
            const refreshToken = jwt.sign({
                "name":req.body.username,
                "roles":[1000]
            },
            process.env.REFRESH_TOKEN_KEY,
            {expiresIn: '1d'}
            )
        
            const accessToken = jwt.sign({
                "name":req.body.username,
                "roles":[1000]
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
                res.cookie('jwt',refreshToken,{httpOnly: true, sameSite: 'None', secure: true,expiresIn : 24 * 60 * 60 * 1000})
                req.loginData = message;
                next();
            }catch(err){
                res.status(500).send("There was an error when trying to complete the login process.Please try to login again.")
            }
            break;
        }case 'admin':{
            const refreshToken = jwt.sign({
                "name":req.body.username,
                "roles":[2000]
            },
            process.env.REFRESH_TOKEN_KEY,
            {expiresIn: '1d'}
            )
        
            const accessToken = jwt.sign({
                "name":req.body.username,
                "roles":[2000]
            },
            process.env.ACCESS_TOKEN_KEY,
            {expiresIn: '1800s'}
            )
        
            let message = {
                "accessToken":accessToken,
                "roles":[2000]
            }
        
            try{
                let [results,fields] = await connection.query("INSERT INTO admin_login (`admin_id`,`refresh_token`) VALUES (?,?)",[req.Profile.admin_id,refreshToken])
                res.cookie('jwt',refreshToken,{httpOnly: true, sameSite: 'None', secure: true,expiresIn : 24 * 60 * 60 * 1000})
                req.loginData = message;
                next();
            }catch(err){
                console.log(err);
                res.status(500).send("There was an error when trying to complete the login process.Please try to login again.")
            }
        }
    }
    
}

module.exports = getAccessToken