const jwt = require('jsonwebtoken')
require('dotenv').config()

const refreshToken = async(req,res,next)=>{
    if(!req.cookies?.jwt){
        res.status(401).send("Unauthorized.Do not have a refresh token");
    }
    const refreshToken = req.cookies?.jwt
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY,function(err,result){
        const accessToken = jwt.sign(
            {
                "name":decoded.name,
                "roles":[1000]
            },
            process.env.ACCESS_TOKEN_KEY,
            {expiresIn: '3600s'}
        )
        let message = {
            "accessToken":accessToken,
            "roles":[1000]
        }
        req.refreshData = message;
        next() 
    })    
}

module.exports = refreshToken