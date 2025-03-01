const bcrypt = require('bcrypt');
const DBconn = require('../connDB/connDB')



const authenticator = async (req,res,next)=>{

    let connection = await DBconn('login procedure');

    const user = req.body.user;
    if(!user?.name && !user?.password){
        return res.status(401).send("Provide username and passowrd")
    }
    let [results,fields] = await connection.query('SELECT * from `customer` WHERE `name`= ?',[user.name])
    if(results.length==0){
        return res.status(401).send("Invalid username or password")
    }
    bcrypt.compare(user.password,results[0]?.password,function(err,result){
        if(err){
            res.status(401).send("Provide the correct Username and Password")
        }
        if(result){
            let userProfile = results[0]
            delete userProfile['password']
            req.userProfile =  userProfile;
            next()
        }else{
            res.status(401).send("Invalid username or password")
        }
    })
}

module.exports= authenticator;