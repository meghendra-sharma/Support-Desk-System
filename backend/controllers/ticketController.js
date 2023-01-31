
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


//@desc -- get single ticket
//@route -- api/tickets/:ticketId
//@access -- private
const getSingleTicket = async (req,res ,next) => {

    //getting the user details from the request object
    const user = req.user._id


    //getting the ticketId from the URL
    const ticketId = req.params.ticketId

    //asynchronus function
    //returns single ticket from the tickets collection
    //model -- Ticket
    Ticket.findById(ticketId).then((ticket) => {

        //Ticket not found in the database
        if(ticket === null){
            throw Error('Ticket Not Found or Invalid Ticket Id')
        }
        
        //if the user want to access the tickets of other user/account
        //throws error 'not authorised'
        if(ticket.user.toString() !== user.toString()){
            throw Error("Not Authorized")
        }
        res.status(200).json(ticket)
    }).catch((error) => {
        res.status(401)
        next(error)
    })
}


//@desc -- create a ticket
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

//@desc -- delete single ticket
//@route -- api/tickets/:ticketId
//@access -- private
const deleteSingleTicket = async (req,res ,next) => {

    //getting the user details from the request object
    const user = req.user._id


    //getting the ticketId from the URL
    const ticketId = req.params.ticketId

    //asynchronus function
    //returns single ticket from the tickets collection
    //model -- Ticket
    Ticket.findById(ticketId).then((ticket) => {

        //Ticket not found in the database
        if(ticket === null){
            throw Error('Ticket Not Found or Invalid Ticket Id')
        }
        
        //if the user want to access the tickets of other user/account
        //throws error 'not authorised'
        if(ticket.user.toString() !== user.toString()){
            throw Error("Not Authorized")
        }

        //deleting a ticket
        return Ticket.findByIdAndRemove(ticketId)
        
    }).then((ticket) => {
        //ticket deleted
        res.status(200).json({success : true,
        ticket})
    }).catch((error) => {
        res.status(401)
        next(error)
    })
}


//@desc -- update single ticket
//@route -- api/tickets/:ticketId
//@access -- private
const updateSingleTicket = async (req,res ,next) => {

    //getting the user details from the request object
    const user = req.user._id


    //getting the ticketId from the URL
    const ticketId = req.params.ticketId

    //geting the update object from the request 
    const update = req.body

    //asynchronus function
    //returns single ticket from the tickets collection
    //model -- Ticket
    Ticket.findById(ticketId).then((ticket) => {

        //Ticket not found in the database
        if(ticket === null){
            throw Error('Ticket Not Found or Invalid Ticket Id')
        }
        
        //if the user want to access the tickets of other user/account
        //throws error 'not authorised'
        if(ticket.user.toString() !== user.toString()){
            throw Error("Not Authorized")
        }

        //updating a ticket
        return Ticket.findByIdAndUpdate(ticketId , update , {new : true})
        
    }).then((ticket) => {
        //ticket updated
        //sending updated ticket as a response
        res.status(200).json({success : true,
        ticket})
    }).catch((error) => {
        res.status(401)
        next(error)
    })
}


module.exports = {getTickets , createTicket , getSingleTicket , deleteSingleTicket , updateSingleTicket}