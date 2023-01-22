const User = require('./../models/userModel')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../jwt/generateToken')


//@desc -- register a user
//@route -- api/users/
//@access -- public

const registerUser = async (req,res ,next) => {

    //parsing the request object
    //destructuring the req.body
    const {name , email , password} = req.body

    //validation
    if(!name || !email || !password){
        res.status(400)
        try {
            throw new Error("Please enter all fields") // calling errorHandler -- middleware 
        } catch (error) {
           next(error) 
        }
        
    }
    else{

        //finding in the database whether user already exists
        //Model.findOne -- returns a Query object which can be treated as an object
        User.findOne({email} , async (error,result) => {
            if(error){
                res.status(500)
                
                next(error)
            }
            else{
                
                //registering a user into the mongodb database
                if(!result){

                    //generating the salt
                    const salt = await bcrypt.genSalt(10)

                    //hasing the password
                    const hashedPassword = await bcrypt.hash(password,salt)
                    
                    //creating the user
                    User.create({
                        name,
                        email,
                        password : hashedPassword
                    }).then((user) => {
                        res.status(201)
                        res.json({
                            _id : user._id,
                            name : user.name,
                            email : user.email,
                            token : generateToken(user._id)
                        })
                    }).catch((error) => {
                            res.status(400)
                            
                            next(error)
                    })

                }

                //user already exists in the database
                else{
                    res.status(400)
                    try{
                        throw new Error('User Already Exists')
                    }
                    catch(error){
                        next(error)
                    }
                    
                    
                }
            }
        })
        
    }
}



//@desc -- authenticate a user
//@route -- api/users/login
//@access -- public

const loginUser = async (req,res,next) => {

    const {email,password} = req.body

    //Validation
    if(!email || !password){
        res.status(400)
        try {
            throw new Error("Please provide all fields")
        } catch (error) {
            next(error)
        }
        
    }


    //Authentication
    //checking whther the user exists or not by matching the name and password from the database.
    User.findOne({email}, (error,result) => {
        if(error){
            res.status(500)
            next(500)
        }
        else {

            //user exists
            //checking whether password is matching or not
            if(result){
                bcrypt.compare(password,result.password).then((isMatched) => {

                    //password matched
                    if(isMatched){
                        res.status(200)
                        res.json({
                            _id : result._id,
                            name : result.name,
                            email : result.email,
                            token : generateToken(result._id)
                        })
                    }

                    //password didn't match
                    else{
                        res.status(401)
                        try {
                            throw new Error('Invalid Credentials')
                        } catch (error) {
                            next(error)
                        }
                    }
                }).catch((error) => {
                    res.status(500)
                    next(error)
                })

            }

            //User doesn't exixts or invalid credentials
            else{
                res.status(401)
                try {
                    throw new Error('Invalid Credentials')
                } catch (error) {
                    next(error)
                }
                
            }
        }
    })

    
}


//@desc -- return the user details if authorized, returns the id of the user
//@route -- api/users/me
//@access -- private/protected

const getMe = (req,res) => {
    
    const user = {
        id : req.user._id,
        name : req.user.name,
        email : req.user.email
    }
    res.status(200).json(user)
}







module.exports = {
    registerUser,
    loginUser,
    getMe
}