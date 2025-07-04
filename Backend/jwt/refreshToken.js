const jwt = require('jsonwebtoken')
require('dotenv').config()

const refreshToken = async(req,res,next)=>{
    if(!req.cookies?.jwt){
        return res.status(401).send("Unauthorized.Do not have a refresh token");
    }
    const refreshToken = req.cookies?.jwt;
    console.log('refreshToken:',refreshToken);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY,function(err,decoded){
        if(err){
            console.log("error while trying to decode refresh token: ",err)
            return res.send("Error in refresh token")
        }
        let message;
        switch(req.body.role){
            case 'customer':{
                const accessToken = jwt.sign(
                    {
                        "name":decoded.name,
                        "roles":[1000]
                    },
                    process.env.ACCESS_TOKEN_KEY,
                    {expiresIn: '3600s'}
                )

                message = {
                    "accessToken":accessToken,
                    "roles":[1000]
                }
            }case 'admin':{
                const accessToken = jwt.sign(
                    {
                        "name":decoded.name,
                        "roles":[2000]
                    },
                    process.env.ACCESS_TOKEN_KEY,
                    {expiresIn: '3600s'}
                )

                message = {
                    "accessToken":accessToken,
                    "roles":[2000]
                }
            }
        }
        req.refreshData = message;
        next() 
    })    
}

module.exports = refreshToken