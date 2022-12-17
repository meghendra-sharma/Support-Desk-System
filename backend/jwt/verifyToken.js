const jwt = require('jsonwebtoken')

//verifying a token
const verifyToken = async (token , secretKey) => {
    var payload
    jwt.verify(token , secretKey , (error,decoded) => {
        if(error){
            //token is invalid 
            //sign didn't match or options values are invalid
            throw error
            
        }
        else{
            //token is valid and returns the decoded payload
            payload = decoded
        }
    })
    return payload
}


module.exports = {verifyToken}