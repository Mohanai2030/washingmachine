const bcrypt = require('bcrypt');
const DBconn = require('../connDB/connDB')



const authenticator = async (req,res,next)=>{

    let connection = await DBconn('login procedure');

    const user = req.body;
    if(!user?.name && !user?.password){
        return res.status(401).send("Provide username and passowrd")
    }

    let results;
    let fields;
    switch(user?.role){
        case 'customer':{
            [results,fields] = await connection.query('SELECT * from `customer` WHERE name = ?',[user.name])
            break;
            // console.log(user.name,results,fields,"length = 0")
        }case 'admin':{
            [results,fields] = await connection.query('SELECT * from `admintable` WHERE name= ?',[user.name])
            break;
        }
    }

    if(results.length==0){
        console.log(user.name,results,fields,"length = 0")
        return res.status(401).send("Invalid username or password")
    }

    bcrypt.compare(user.password,results[0]?.password,function(err,result){
        if(err){
            res.status(401).send("Provide the correct Username and Password")
        }
        if(result){
            let Profile = results[0]
            delete Profile['password']
            req.Profile =  Profile;
            next()
        }else{
            res.status(401).send("Invalid username or password")
        }
    })
}

module.exports= authenticator;