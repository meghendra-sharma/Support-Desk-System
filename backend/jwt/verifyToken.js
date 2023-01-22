const jwt = require('jsonwebtoken')

//verifying a token
const verifyToken = async (token , secretKey) => {
    
    //synchronus behaviour
    //returns payload - if token is valid
    //throw error if token is invalid
    return jwt.verify(token,secretKey)
}


module.exports = {verifyToken}