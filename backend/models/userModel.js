const mongoose =  require("mongoose")
// const { boolean } = require("webidl-conversions")


//creating the schema 
//collection -- users
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true , "Please add an name"]
    },
    email : {
        type : String,
        required : [true , 'Please add an email'],
        unique : true
    },
    password : {
        type : String,
        required : [true , 'Please add password'],
    },
    is_admin : {
        type : Boolean,
        default : false
    }
} , {timestamps : true}) 


//creating the model
//schema -- userSchema
//model -- User
const User = mongoose.model('User' , userSchema)

module.exports = User