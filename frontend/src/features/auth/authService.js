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


//service - logout
//def - clears the user from local storage and also update the global state

const logoutService =   () => {
    
    //removes the user from localstorage
    localStorage.removeItem('user')
    
    
    
}


export  {registerService , logoutService}