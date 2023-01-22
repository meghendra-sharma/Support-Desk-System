const jwt = require("jsonwebtoken")
const { verifyToken } = require("../jwt/verifyToken")
const User = require('../models/userModel')

//authenticating a user 
//checking whether the token is valid or not
const authenticate = async (req,res,next) => {

    //checking whether the request object contains the authorization field in header 
    //if authorization is present in header is it starts with 'Bearer' ?
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        
        //verifying a token is valid or invalid 
        //if valid -- return a decoded payload
        //if invalid -- throw an error
        verifyToken(token,process.env.JWT_SECRET).then((decoded) => {
            
            //asynchronus operation -- findById
            //return promise
            //return document or throw error
            //using select for projection excluding password property from user document
            return User.findById(decoded.id).select('-password')
            
            
        }).then((user) => {
            //adding user into the request for next middleware to use it.
            req.user = user
            next() //calling the next middleware
        }).catch((error) => {
            res.status(401)
            next(error)
        })
        
        
    } 

    //unauthorized
    //request does have authorization in header or authorisation does not start with 'Bearer' 
    else{
        res.status(401)
        try {
            throw new Error('Unauthorized')
        } catch (error) {
            next(error)
        }
        
    }


    

}


module.exports = {authenticate}