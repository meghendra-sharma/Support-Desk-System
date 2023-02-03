import axios from "axios"


//code used in production
//in production -- it will use the backend base url
//in development -- it will use proxy i.e http://localhost:PORT
const backendBaseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_BASE_URL : ''


//backend API -- to create a ticket
const createTicketAPIURL = backendBaseURL +  '/api/tickets'

//backend API -- to get all the tickets of a user
const getAllTicketsAPIURL = backendBaseURL +  '/api/tickets'


//backend API -- to get the single ticket of a user
const getSingleTicketAPIURL = backendBaseURL +  '/api/tickets/'

//backend API -- to update the single ticket of a user
const updateSingleTicketAPIURL = backendBaseURL +  '/api/tickets/'


//service - createTicket
//def - create a ticket in the database
//returns a promise
//method -- POST
//promise fullfilled -- returns ticket object
//promise rejected -- throw error object
const createTicketService = async (ticketData , token) => {

    //creating config object
    //setting authorization -- jwt token
    const config = {
        headers : {
            Authorization : 'Bearer ' + token
        }
    }

    //POST request to create a ticket in the database
    return axios.post(createTicketAPIURL , ticketData , config)

}


//service - getAllTickets
//def - get all the tickets of a user from the database
//returns a promise
//method -- GET
//promise fullfilled -- returns tickets array
//promise rejected -- throw error object
const getAllTicketsService = async (token) => {

    //creating config object
    //setting authorization -- jwt token
    const config = {
        headers : {
            Authorization : 'Bearer ' + token
        }
    }

    //GET request to get all the tickets of a user from the database
    return axios.get(getAllTicketsAPIURL , config)

}


//service - getSingleTicket
//def - get single ticket of a user from the database
//returns a promise
//method -- GET
//promise fullfilled -- returns ticket object
//promise rejected -- throw error object
const getSingleTicketService = async (ticketId , token) => {

    //creating config object
    //setting authorization -- jwt token
    const config = {
        headers : {
            Authorization : 'Bearer ' + token
        }
    }

    //GET request to get a ticket from the database database
    return axios.get(getSingleTicketAPIURL + ticketId , config)

}


//service - updateSingleTicket
//def - update single ticket of a user in the database
//returns a promise
//method -- PUT
//promise fullfilled -- returns updated ticket object
//promise rejected -- throw error object
const updateSingleTicketService = async (ticketId ,update, token) => {

    

    //creating config object
    //setting authorization -- jwt token
    const config = {
        headers : {
            Authorization : 'Bearer ' + token
        }
    }

    //PUT request to update a ticket int the database 
    return axios.put(updateSingleTicketAPIURL + ticketId ,update, config)

}


//exporting services
export {createTicketService , getAllTicketsService , getSingleTicketService , updateSingleTicketService}