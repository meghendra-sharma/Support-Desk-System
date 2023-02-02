const mongoose =  require("mongoose")
// const { boolean } = require("webidl-conversions")


//creating the schema 
//collection -- notes
const noteSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : 'User'
    },
    ticket : {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : 'Ticket'
    },
    text : {
        type : String,
        required : [true , 'Please add some text'],
    },
    isStaff : {
        type : Boolean,
        default : false
    },
    staffId : {
        type : String
    }
} , {timestamps : true}) 


//creating the model
//schema -- noteSchema
//model -- Note
const Note = mongoose.model('Note' , noteSchema)

module.exports = Note