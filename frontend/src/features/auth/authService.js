import axios from 'axios';


//backend API - to register the user
const registerAPIURL = '/api/users'

//service - register
//def - register the user in the database
//returns a promise
const registerService =  async (userData) => {
    
    //making a post request to the backend API.
    //API  - /api/users
    return axios.post(registerAPIURL , userData)
    
    
    
}


export default registerService