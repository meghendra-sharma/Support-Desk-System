import axios from 'axios'


//backend API -- to create a note 
const createNoteAPIURL = '/api/tickets/'


//backend API -- to get all notes 
const getNotesAPIURL = '/api/tickets/'

//service - createNote
//def - create a note in the database
//returns a promise
//method -- POST
//promise fullfilled -- returns note object
//promise rejected -- throw error object
const createNoteService = async (ticketId , text , token) => {

    //creating config object
    //setting authorization -- jwt token
    const config = {
        headers : {
            Authorization : 'Bearer ' + token
        }
    }

    //POST request to create a note in the database
    return axios.post(createNoteAPIURL + ticketId + '/notes' , {text} , config)

}


//service - getNotes
//def - get all the notes of a ticket  from the database
//returns a promise
//method -- GET
//promise fullfilled -- returns notes array
//promise rejected -- throw error object
const getNotesService = async (ticketId ,token) => {

    //creating config object
    //setting authorization -- jwt token
    const config = {
        headers : {
            Authorization : 'Bearer ' + token
        }
    }

    //GET request to get all the notes of a ticket  from the database
    return axios.get(getNotesAPIURL + ticketId + '/notes' , config)

}

//exporting note services
export {createNoteService , getNotesService}