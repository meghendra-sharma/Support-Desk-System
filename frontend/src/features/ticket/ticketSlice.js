import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { createTicketService, getAllTicketsService, getSingleTicketService, updateSingleTicketService } from "./ticketService";

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


//asynchronus action
//redux middleware - performs asynchronus task and then automatically call the actions and update the states
//you can catch the actions on extra reducers in the slice
//get all the tickets of a user from the database
//slice - ticket
//actions - getAllTickets.pending , getAllTickets.fullfilled , getAllTickets.rejected
//payload -- array of tickets for fullfilled
//payload -- message for rejected

export const getAllTickets = createAsyncThunk('ticket/getAllTickets' , async (_ ,thunkApi) => {


    //getting the token from the "auth" state
    const token  = thunkApi.getState().auth.user.token

    return getAllTicketsService(token).then((response) => {

        //promise fullfilled
        
        //returns the response object from the server
        //getting the data from response -- response.data
        const tickets = response.data


        console.log(tickets) //for debugging purpose
        //localStorage.setItem('user',JSON.stringify(user)) //stroing the user in the browser
        return tickets
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
        //dispatching the action -- getAllTickets.rejected
        //payload -- message
        return thunkApi.rejectWithValue(message)
        
    })
})


//asynchronus action
//redux middleware - performs asynchronus task and then automatically call the actions and update the states
//you can catch the actions on extra reducers in the slice
//get single ticket of a user from the database
//slice - ticket
//actions - getSingleTicket.pending , getSingleTicket.fullfilled , getSingleTicket.rejected
//payload -- ticket object for fullfilled
//payload -- message for rejected

export const getSingleTicket = createAsyncThunk('ticket/getSingleTicket' , async (ticketId ,thunkApi) => {


    //getting the token from the "auth" state
    const token  = thunkApi.getState().auth.user.token

    return getSingleTicketService(ticketId ,token).then((response) => {

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
        //dispatching the action -- getSingleTicket.rejected
        //payload -- message
        return thunkApi.rejectWithValue(message)
        
    })
})


//asynchronus action
//redux middleware - performs asynchronus task and then automatically call the actions and update the states
//you can catch the actions on extra reducers in the slice
//update single ticket of a user in the database -- here in this case updating the status
//slice - ticket
//actions - updateSingleTicket.pending , updateSingleTicket.fullfilled , updateSingleTicket.rejected
//payload -- updated ticket object for fullfilled
//payload -- message for rejected

export const updateSingleTicket = createAsyncThunk('ticket/updateSingleTicket' , async (ticketId,thunkApi) => {


    //getting the token from the "auth" state
    const token  = thunkApi.getState().auth.user.token


    //what needs to be updated
    //update object
    //here in this case status of ticket is updated to closed
    const update = {status : 'closed'}

    return updateSingleTicketService(ticketId,update,token).then((response) => {

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
        //dispatching the action -- updateSingleTicket.rejected
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

        //catching action -- getAllTickets.pending
        //updating the state

        .addCase(getAllTickets.pending , (state) => {state.isLoading = true})

        //catching action -- getAllTickets.fulfilled
        //updating the state
        .addCase(getAllTickets.fulfilled , (state , action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tickets = action.payload
            
        })

        //catching action -- getAllTickets.rejected
        //updating the state
        .addCase(getAllTickets.rejected , (state , action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        //catching action -- getSingleTicket.pending
        //updating the state

        .addCase(getSingleTicket.pending , (state) => {state.isLoading = true})

        //catching action -- getSingleTicket.fulfilled
        //updating the state
        .addCase(getSingleTicket.fulfilled , (state , action) => {
            state.isLoading = false
            state.isSuccess = true
            state.ticket = action.payload
            
        })

        //catching action -- getSingleTicket.rejected
        //updating the state
        .addCase(getSingleTicket.rejected , (state , action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

           //catching action -- updateSingleTicket.pending
        //updating the state

        .addCase(updateSingleTicket.pending , (state) => {state.isLoading = true})

        //catching action -- updateSingleTicket.fulfilled
        //updating the state
        .addCase(updateSingleTicket.fulfilled , (state , action) => {
            state.isLoading = false
            //state.isSuccess = true
            state.ticket = action.payload.ticket
            
        })

        //catching action -- updateSingleTicket.rejected
        //updating the state
        .addCase(updateSingleTicket.rejected , (state , action) => {
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