import axios from "axios"


//backend API -- to create a ticket
const createTicketAPIURL = '/api/tickets'

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

    //post request to create a ticket in the database
    return axios.post(createTicketAPIURL , ticketData , config)

}


//exporting services
export {createTicketService}