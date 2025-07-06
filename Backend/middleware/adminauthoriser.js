
const jwt = require('jsonwebtoken')

const adminAuthoriser = (req,res,next) => {
    if(req.headers?.["authorization"]){
        const authHeader = req.headers["authorization"]
        const accessToken = authHeader && authHeader.split(' ')[1];
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_KEY,function(err,decoded){
            if(err){
                console.log(err);
                return res.sendStatus(403);}
            else{
                if(decoded.roles[0]==2000){
                    next();
                }else{
                    return res.sendStatus(401)
                }
            }
        })
    }else{
        return res.status(403).send("Try to login again to make valid requests")
    }
    
}

module.exports = adminAuthoriser