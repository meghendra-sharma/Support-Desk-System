import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import { getNotesService ,  createNoteService } from './noteService'



//creating initial state
const initialState = {
    notes : [],
    note : {},
    isError : false,
    message : '',
    isSuccess : false,
    isLoading : false
}


//asynchronus action
//redux middleware - performs asynchronus task and then automatically call the actions and update the states
//you can catch the actions on extra reducers in the slice
//create a note in the database
//slice - note
//actions - createNote.pending , createNote.fullfilled , createNote.rejected
//payload -- note for fullfilled
//payload -- message for rejected

export const createNote = createAsyncThunk('note/createNote' , async (noteData , thunkApi) => {


    //getting the token from the "auth" state
    const token  = thunkApi.getState().auth.user.token

    //destructuring ticket data
    const {ticketId , text} = noteData

    return createNoteService(ticketId , text , token).then((response) => {

        //promise fullfilled
        
        //returns the response object from the server
        //getting the data from response -- response.data
        const note = response.data


        console.log(note) //for debugging purpose
        //localStorage.setItem('user',JSON.stringify(user)) //stroing the user in the browser
        return note
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
        //dispatching the action -- createNote.rejected
        //payload -- message
        return thunkApi.rejectWithValue(message)
        
    })
})


//asynchronus action
//redux middleware - performs asynchronus task and then automatically call the actions and update the states
//you can catch the actions on extra reducers in the slice
//create a note in the database
//slice - note
//actions - getNotes.pending , getNotes.fullfilled , getNotes.rejected
//payload -- notes array for fullfilled
//payload -- message for rejected

export const getNotes = createAsyncThunk('note/getNotes' , async (ticketId , thunkApi) => {


    //getting the token from the "auth" state
    const token  = thunkApi.getState().auth.user.token

    

    return getNotesService(ticketId , token).then((response) => {

        //promise fullfilled
        
        //returns the response object from the server
        //getting the data from response -- response.data
        const notes = response.data


        console.log(notes) //for debugging purpose
        //localStorage.setItem('user',JSON.stringify(user)) //stroing the user in the browser
        return notes
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
        //dispatching the action -- getNotes.rejected
        //payload -- message
        return thunkApi.rejectWithValue(message)
        
    })
})










const noteSlice = createSlice({
    name : 'note',
    initialState,
    reducers : {
        reset : state => initialState
    },
    extraReducers : (builder) => {

        //catching action -- getNotes.pending
        //updating the state

        builder.addCase(getNotes.pending , (state) => {state.isLoading = true})

        //catching action -- getNotes.fulfilled
        //updating the state
        .addCase(getNotes.fulfilled , (state , action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes = action.payload
            
        })

        //catching action -- getNotes.rejected
        //updating the state
        .addCase(getNotes.rejected , (state , action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })


        //catching action -- createNote.fulfilled
        //updating the state
        .addCase(createNote.fulfilled , (state , action) => {
            //state.isLoading = false
            state.isSuccess = true
            state.note = action.payload
            
        })

        //catching action -- createNote.rejected
        //updating the state
        .addCase(createNote.rejected , (state , action) => {
            //state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})


//exporting actions
export const {reset} =  noteSlice.actions


//exporting reducer
//reducer -- note 
export default noteSlice.reducer