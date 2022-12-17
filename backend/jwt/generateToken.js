const jwt  = require('jsonwebtoken')

//generating the JWT token
//payload -- user._id
const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn : '1d'
    })
}


module.exports = {generateToken}