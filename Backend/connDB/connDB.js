const mysql = require('mysql2/promise');
async function DBconn(purpose='server conncetion'){
    try{
        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        });
        console.log('Connected to MySQL database for ',purpose);
        return connection
    }catch(err){
        console.error('When trying to',purpose,'Error connecting to MySQL', err);
        return;
    }
}

module.exports = DBconn