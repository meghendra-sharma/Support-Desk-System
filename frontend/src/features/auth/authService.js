import axios from 'axios';

//code used in production
//in production -- it will use the backend base url
//in development -- it will use proxy i.e http://localhost:PORT
const backendBaseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_BASE_URL : ''

//backend API - to register the user
const registerAPIURL =  backendBaseURL + '/api/users'

//backend API - to login user
const loginAPIURL = backendBaseURL + '/api/users/login'

//service - register
//def - register the user in the database
//returns a promise
const registerService =  async (userData) => {
    
    //making a post request to the backend API.
    //API  - /api/users
    return axios.post(registerAPIURL , userData)
    
    
    
}


//service - login
//def - login the user in the database
//returns a promise
const loginService =  async (userData) => {
    
    //making a post request to the backend API.
    //API  - /api/users/login
    return axios.post(loginAPIURL , userData)
    
    
    
}


//service - logout
//def - clears the user from local storage and also update the global state

const logoutService =   () => {
    
    //removes the user from localstorage
    localStorage.removeItem('user')
    
    
    
}


export  {registerService , logoutService , loginService}