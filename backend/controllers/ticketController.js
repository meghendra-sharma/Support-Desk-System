
//bringing Ticket and User model
const Ticket  = require('../models/ticketModel')
const User = require('../models/userModel')


//@desc -- get the tickets
//@route -- api/tickets/
//@access -- private
const getTickets = async (req,res ,next) => {

    //getting the user details from the request object
    const user = req.user._id


    //asynchronus function
    //returns the ticket array from the tickets collection
    //model -- Ticket
    Ticket.find({user : user}).then((tickets) => {
        res.status(200).json(tickets)
    }).catch((error) => {
        res.status(401)
        next(error)
    })
}


//@desc -- crrate a ticket
//@route -- api/tickets/
//@access -- private

const createTicket  = async (req,res , next) => {

    //getting the ticket details from the request object
    const {product,description}  = req.body

    //getting the user details from the request object
    const user = req.user._id


    //asynchronus operation
    //creating a ticket in tickets collection 
    //model -- Ticket
    Ticket.create({
        product,
        description,
        user
    }).then((ticket) => {
        res.status(201).json(ticket)
    }).catch((error) => {
        res.status(401)
        next(error)
    })
}


module.exports = {getTickets , createTicket}