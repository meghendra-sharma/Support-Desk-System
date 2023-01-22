const mongoose =  require("mongoose")
// const { boolean } = require("webidl-conversions")


//creating the schema 
//collection -- tickets
const ticketSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : 'User'
    },
    product : {
        type : String,
        required : [true , 'Please select a product'] ,
        enum : ['iPhone' , 'iMac' , 'iPad' , 'Macbook Pro']
    },
    description : {
        type : String,
        required : [true , 'Please add a description of the issue'],
    },
    status : {
        type : String,
        required : true ,
        enum : ['new' , 'open' , 'closed'],
        default : 'new'
    }
} , {timestamps : true}) 


//creating the model
//schema -- ticketSchema
//model -- Ticket
const Ticket = mongoose.model('Ticket' , ticketSchema)

module.exports = Ticket