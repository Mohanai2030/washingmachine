const jwt = require('jsonwebtoken')

const verifyWSLevelChat = (messageAuth) => {
    const accessToken = messageAuth;
    return new Promise((resolve, reject) => {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
            if (err) {
                console.log("error in jwt verification:",err)
                resolve("Token expired");
            } else if (decoded.roles?.[0] == 1000) {
                resolve('customer');
            } else if (decoded.roles?.[0] == 2000) {
                resolve('admin');
            } else {
                resolve(null);
            }
        });
    });
}


module.exports = verifyWSLevelChat