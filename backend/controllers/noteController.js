//bringing model -- Note
const Note = require('../models/noteModel')

//bringing model -- Ticket
const Ticket = require('../models/ticketModel')



//@desc -- create a note
//@route -- api/tickets/:ticketId/notes
//@access -- private

const createNote  = async (req,res , next) => {

    //getting the ticket details from the request URL
    const {ticketId}  = req.params

    //getting the user details from the request object
    const user = req.user._id

    //getting the text from the request body
    const {text} = req.body


    //asynchronus operation
    //creating a note in notes collection in the database 
    //model -- Note
    Ticket.findById(ticketId).then((ticket) => {


        //if the user wants to add  notes on the ticket that does not exists
        if(ticket === null){
            throw Error('Sorry Cannot add note because the ticket is not found')
        }

        //if the user try to add note to the tickets of other user accounts
        if(ticket.user.toString() !== user.toString()){
            throw Error('Not Authorized')
        }


        //creating a note in the database
        return Note.create({
            ticket : ticketId,
            user,
            text
        })
    }).then((note) => {
        res.status(201).json(note)
    }).catch((error) => {
        res.status(401)
        next(error)
    })

}


//@desc -- get all notes of a ticket
//@route -- api/tickets/:ticketId/notes
//@access -- private

const getNotes  = async (req,res , next) => {

    //getting the ticket details from the request URL
    const {ticketId}  = req.params

    //getting the user details from the request object
    const user = req.user._id

    


    //asynchronus operation
    //getting all the notes of a ticket from the collection in the database 
    //model -- Note
    Ticket.findById(ticketId).then((ticket) => {


        //if the user wants to get the   notes of a  ticket that does not exists
        if(ticket === null){
            throw Error('Sorry Cannot add note because the ticket is not found')
        }

        //if the user try to get the notes of a  ticket of other user accounts
        if(ticket.user.toString() !== user.toString()){
            throw Error('Not Authorized')
        }


        //finding all the notes of a ticket in the database
        return Note.find({
            ticket : ticketId
        })
    }).then((notes) => {
        res.status(201).json(notes)
    }).catch((error) => {
        res.status(401)
        next(error)
    })

}


module.exports = {createNote , getNotes}