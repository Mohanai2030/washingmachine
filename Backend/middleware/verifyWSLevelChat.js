const jwt = require('jsonwebtoken')

const verifyWSLevelChat = (messageAuth)=>{
    const accessToken = messageAuth
    jwt.verify(accessToken,process.env.ACCESS_TOKEN_KEY,(err,decoded)=>{
        if(err){
            return "Token expired"
        }
        if (decoded.roles?.[0]==1000){
            return 'admin'
        }else if(decoded.roles?.[0]==2000){
            return 'customer'
        }else{
            return null
        }
    })
}

module.exports = verifyWSLevelChat