const signupValidator = (req,res,next)=>{
    console.log("inside signup validator")
    if(req.body?.name && req.body?.password){
        next();
    }else{
        return res.status(401).send("Provide a username and password")
    }
}

module.exports = signupValidator