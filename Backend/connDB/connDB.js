const mysql = require('mysql2/promise');
async function DBconn(purpose){
    try{
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'test',
            password: process.env.DATABASE_PASSWORD,
            database: 'laundry',
        });
        console.log('Connected to MySQL database.');
        return connection
    }catch(err){
        console.error('When trying to',purpose,'Error connecting to MySQL', err);
        return;
    }
}

module.exports = DBconn