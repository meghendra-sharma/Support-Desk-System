import React from 'react'
import { useEffect } from 'react'
import {useSelector,  useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Back from '../components/Back'
import { getSingleTicket, reset, updateSingleTicket } from '../features/ticket/ticketSlice'
import { createNote, getNotes , reset as noteReset } from '../features/note/noteSlice'
import NoteItem from '../components/NoteItem'
import SomethingWentWrong from '../components/SomethingWentWrong'
import Modal from '../components/Modal'

function Ticket() {

    //destructuring global state -- ticket
    const {ticket , isLoading , isSuccess , isError , message} = useSelector(state => state.ticket)

    //destructuring global state -- notes
    const {notes , note, isSuccess : noteIsSuccess , isLoading : notesIsLoading , isError : noteIsError , message : noteMessage} = useSelector(state => state.note)

    //getting ticketId from the URL
    const params = useParams()
    //destructuring
    const {ticketId} = params

    //initializing dispatch
    const dispatch = useDispatch()

    //state -- ticket
    //runs when the component mounts or component did mount
    useEffect(() => {
        if(isError === false && isSuccess === false){

            //calling ticket slice redux thunk middleware
            dispatch(getSingleTicket(ticketId))

            
        }
        if(isError){
            toast.error(message)
        }
        
    },[isError,isSuccess , message , ticketId , dispatch])

    //state -- ticket
    //runs when the component unmounts
    useEffect(() => {
        return () => {
            if(isSuccess){
                dispatch(reset())
            }
        }
        
    },[isSuccess,dispatch])


    //state -- note
    //runs when the component mount or component did mount
    useEffect(() => {

        if(noteIsError){
            toast.error(noteMessage)
        }
    },[dispatch , noteIsError , noteMessage])


    //runs when the component mount or user create a note
    useEffect(() => {
        //note slice redux thunk  middleware
        dispatch(getNotes(ticketId))
    },[note , dispatch])


    //state -- note
    //runs when the component ummounts
    useEffect(() => {
        return () => {
            if(noteIsSuccess)
            dispatch(noteReset())
        }
    },[dispatch , noteIsSuccess ])




    //onClick of close ticket button
    function onClick(event){
        dispatch(updateSingleTicket(ticketId))
        console.log("closed ticket")
    }


    //adding note 
    //diapatching createNote
    //slice -- note
    //state -- note
    function addNote(text){
        dispatch(createNote({ticketId,text}))
    }


    //Spinner Component
    if(isLoading){
        return <Spinner/>
    }

    //if error occur in fetching ticket or the notes of a ticket
    if(isError || noteIsError){
        return <SomethingWentWrong/>
    }

    return (
        <div className='container my-4 my-sm-5'>
            

            <div className='mb-4'> <Back url = '/tickets'/> </div>
        <div className='py-2'>
            <div className='d-sm-none'>
            <h6 className='fw-bold'>Status: <span className={ticket.status === 'new' ? "badge text-bg-danger " : ticket.status === 'open' ? 'badge text-bg-warning ' : 'badge text-bg-success' }>{ticket.status}</span></h6>
            <h6 className='fw-bold'>Ticket ID: {ticket._id}</h6>
            </div>
            <div>
            <h6 className='fw-bold d-none d-sm-block '>Ticket ID: {ticket._id} <span className={ticket.status === 'new' ? "badge text-bg-danger " : ticket.status === 'open' ? 'badge text-bg-warning ' : 'badge text-bg-success' }>{ticket.status}</span> </h6>
            <h6 className='fw-bold'>Date Submitted : {new Date(ticket.createdAt).toLocaleString()}</h6>
            <h6 className='fw-bold'>Product: {ticket.product}</h6>
            </div>
            
        </div>
        <hr/>
        <div className='bg-secondary bg-opacity-25 p-2 border  rounded border-secondary'>
            <p className='fw-bold fs-6'>Description of the issue</p>
            <p className='fw-6 fw-normal'>{ticket.description}</p>

        </div>


        {/* displaying bootstrap modal */}
        <div className='my-4'>
            
            <Modal addNote = {addNote} ticketStatus = {ticket.status}/>
        </div>

        {/* Displaying notes */}
        <div className='my-4'>
        <h6 className='fw-bold'>Notes</h6>
        {notes.length > 0 ? notes.map((note) => {
            return <NoteItem key={note._id} note = {note}/>
        }): <div className='font-monospace'>You have no notes.</div> }
        </div>

        {ticket.status !== 'closed' && <div className ="d-grid gap-2 mt-3">
            <button onClick={onClick} className="btn btn-success fw-bold" type="button">Close Ticket</button>
        </div>}
        </div>
    )
}

export default Ticket
