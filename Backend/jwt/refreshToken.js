const jwt = require('jsonwebtoken')
require('dotenv').config()

const refreshToken = async(req,res,next)=>{
    if(!req.cookies?.jwt){
        res.status(401).send("Unauthorized.Do not have a refresh token");
    }
    const refreshToken = req.cookies?.jwt
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY,function(err,result){
        let message;
        switch(req.body.role){
            case 'customer':{
                const accessToken = jwt.sign(
                    {
                        "name":decoded.name,
                        "roles":'customer'
                    },
                    process.env.ACCESS_TOKEN_KEY,
                    {expiresIn: '3600s'}
                )

                message = {
                    "accessToken":accessToken,
                    "roles":'customer'
                }
            }case 'admin':{
                const accessToken = jwt.sign(
                    {
                        "name":decoded.name,
                        "roles":'admin'
                    },
                    process.env.ACCESS_TOKEN_KEY,
                    {expiresIn: '3600s'}
                )

                message = {
                    "accessToken":accessToken,
                    "roles":'admin'
                }
            }
        }
        req.refreshData = message;
        next() 
    })    
}

module.exports = refreshToken