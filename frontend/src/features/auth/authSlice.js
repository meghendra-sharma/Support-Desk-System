import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {registerService , logoutService} from './authService'

//getting the user from the local storage in the browser
//parsing the string into JSON
const user = JSON.parse(localStorage.getItem('user'))

//initializing the global state
const initialState = {
    user : user ? user : null,
    isLoading : false,
    message : '',
    isError : false,
    isSuccess : false,
}

export const login = createAsyncThunk('auth/login' , async (userData , thunkApi) => {
    console.log(userData)
})


//asynchronus action
//redux middleware - performs asynchronus task and then automatically call the actions and update the states
//you can catch the actions on extra reducers in the slice
//logging out a user in the localstorage
//slice - auth
//actions - logout.pending , logout.fullfilled , logout.rejected
//payload -- null for fullfilled
//payload -- null for rejected

export const logout = createAsyncThunk('auth/logout' , async () => {
    return logoutService()
})




//asynchronus action
//redux middleware - performs asynchronus task and then automatically call the actions and update the states
//you can catch the actions on extra reducers in the slice
//registering a user in the database
//slice - auth
//actions - register.pending , register.fullfilled , register.rejected
//payload -- user for fullfilled
//payload -- message for rejected
export const register = createAsyncThunk('auth/register' , async (userData , thunkApi) => {
    
    return registerService(userData).then((response) => {

        //promise fullfilled
        
        //returns the response object from the server
        //getting the data from response -- response.data
        const user = response.data
        console.log(user) //for debugging purpose
        localStorage.setItem('user',JSON.stringify(user)) //stroing the user in the browser
        return user
    }).catch((error) => {

        //promise rejected
        //returns the error object from the server
        
        console.log(error) //for debugging purpose
        var message = ''

        //request was made and server also respond with the error 
        if(error.response.data.message){
            //getting the message from the error send by the server
            message = error.response.data.message
        }

        //either request was made and server didn't respond or request was not made due to some error
        //ex - page not found error
        else{
            //getting the message from the error object
            message = error.message
        }
        
        console.log(message) // for debugging purpose

        //rejecting the promise
        //dispatching the action -- register.rejected
        //payload -- message
        return thunkApi.rejectWithValue(message)
        
    })
    
    
})


//creating slice
//slice - auth
 export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {

        //resetting the global state
        reset : (state) => {
            state.isError = false
            state.isLoading = false
            state.message = ''
            state.isSuccess = false

        }
    },
    extraReducers : (builder) => {

        //adding action - register.pending
        // updating the state
        builder.addCase(register.pending , (state) => {
            state.isLoading = true
        })

        //adding action - register.fulfilled
        // updating the state
        .addCase(register.fulfilled , (state,action) => {
            console.log(action.payload) //for debugging purpose
            state.isSuccess = true
            state.isLoading = false
            state.user = action.payload
        })

        //adding action - register.rejected
        // updating the state
        .addCase(register.rejected , (state,action) => {
            console.log(action.payload) //for debugging purpose
            state.isError = true
            state.isLoading = false
            state.user = null
            state.message = action.payload
        })

         //adding action - logout.fullfilled
        // updating the state
        .addCase(logout.fulfilled , (state) => {
            state.user = null
        })
    }


})

//exporting actions
export const {reset}  = authSlice.actions

//exporting reducers
export default authSlice.reducer