import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { createTicketService } from "./ticketService";

const initialState = {
    ticket : {},
    tickets : [],
    isError : false,
    isSuccess : false,
    message : '',
    isLoading : false
}


//asynchronus action
//redux middleware - performs asynchronus task and then automatically call the actions and update the states
//you can catch the actions on extra reducers in the slice
//create a ticket in the database
//slice - ticket
//actions - createTicket.pending , createTicket.fullfilled , createTicket.rejected
//payload -- ticket for fullfilled
//payload -- message for rejected

export const createTicket = createAsyncThunk('ticket/createTicket' , async (ticketData , thunkApi) => {


    //getting the token from the "auth" state
    const token  = thunkApi.getState().auth.user.token

    return createTicketService(ticketData , token).then((response) => {

        //promise fullfilled
        
        //returns the response object from the server
        //getting the data from response -- response.data
        const ticket = response.data


        console.log(ticket) //for debugging purpose
        //localStorage.setItem('user',JSON.stringify(user)) //stroing the user in the browser
        return ticket
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
        //dispatching the action -- createTicket.rejected
        //payload -- message
        return thunkApi.rejectWithValue(message)
        
    })
})

//creating slice
//slice -- ticket

export const ticketSlice = createSlice({
    name : 'ticket',
    initialState ,
    reducers : {

        //resetting the global state
        reset : (state) => initialState
    },


    extraReducers : (builder) => {

        //catching action -- createTicket.pending
        //updating the state
        builder.addCase(createTicket.pending , (state) => {state.isLoading = true})

        //catching action -- createTicket.fulfilled
        //updating the state
        .addCase(createTicket.fulfilled , (state) => {
            state.isLoading = false
            state.isSuccess = true
            
        })

        //catching action -- createTicket.rejected
        //updating the state
        .addCase(createTicket.rejected , (state , action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})


//exporting action creator functions
export const {reset} = ticketSlice.actions


//exporting reducer
export default ticketSlice.reducer