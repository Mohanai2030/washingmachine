const jwt = require('jsonwebtoken')

const verifyLevelChat = (req,res,next)=>{
    const authHeader = req.headers?.['Authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    // console.log("acessToken:",accessToken);
    if(!jwt){
        return res.status(401).send("Unauthorized.Do not have a token")
    }
    jwt.verify(accessToken,process.env.ACCESS_TOKEN_KEY,(err,decoded)=>{
        if(err){
            console.log("error when trying to verify accessToken",err)
            return res.status(401).send("Token expired")
        }
        console.log("decoded:",decoded)
        if (decoded.roles?.[0]==1000){
            req.role = 'customer'
            next()
        }else if(decoded.roles?.[0]==2000){
            req.role = 'admin'
            next()
        }else{
            res.status(401).send("Please try to login again")
        }
    })
}

module.exports = verifyLevelChat