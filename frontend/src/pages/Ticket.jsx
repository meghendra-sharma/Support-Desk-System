import React from 'react'
import { useEffect } from 'react'
import {useSelector,  useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Back from '../components/Back'
import { getSingleTicket, reset, updateSingleTicket } from '../features/ticket/ticketSlice'

function Ticket() {

    //destructuring global state -- ticket
    const {ticket , isLoading , isSuccess , isError , message} = useSelector(state => state.ticket)

    //getting ticketId from the URL
    const params = useParams()
    //destructuring
    const {ticketId} = params

    //initializing dispatch
    const dispatch = useDispatch()


    //runs when the component mounts or component did mount
    useEffect(() => {
        if(isError === false && isSuccess === false){
            dispatch(getSingleTicket(ticketId))
        }
        if(isError){
            toast.error(message)
        }
        
    },[isError,isSuccess , message , ticketId , dispatch])

    //runs when the component unmounts
    useEffect(() => {
        return () => {
            if(isSuccess){
                dispatch(reset())
            }
        }
        
    },[isSuccess,dispatch])

    //onClick of close ticket button
    function onClick(event){
        dispatch(updateSingleTicket(ticketId))
        console.log("closed ticket")
    }


    //Spinner Component
    if(isLoading){
        return <Spinner/>
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

        {ticket.status !== 'closed' && <div className ="d-grid gap-2 mt-3">
            <button onClick={onClick} className="btn btn-success fw-bold" type="button">Close Ticket</button>
        </div>}
        </div>
    )
}

export default Ticket
