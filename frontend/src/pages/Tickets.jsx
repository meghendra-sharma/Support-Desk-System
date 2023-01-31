import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Back from '../components/Back'
import Spinner from '../components/Spinner'
import TicketItem from '../components/TicketItem'
import { getAllTickets, reset } from '../features/ticket/ticketSlice'


function Tickets() {

//destructuring global state -- ticket
const {tickets , isLoading , isSuccess , isError , message} = useSelector((state) => state.ticket)

//initializing dispatch object
const dispatch = useDispatch()

//when the component unmounts
useEffect(() => {
    return () => {
        if(isSuccess){
            dispatch(reset())
        }
    }
},[isSuccess , dispatch])

//when the component mounts or updated
useEffect(() => {

    //asynchronus actions
    //get all the tickets of the user from the database.
    dispatch(getAllTickets())
},[ dispatch])

if(isLoading){
    return <Spinner/>
}
  return (
    

    <div className='container-fluid mt-5 text-center'>
      
      <div className="container text-center">
      <div className='text-start mb-2'>  <Back url = '/'/> </div>
      <div className='mb-4'><h2 className='fw-bold'> Tickets</h2></div>
        <div className="row bg-secondary bg-opacity-50 py-2 mb-3 rounded d-none d-sm-flex fw-bolder">
              <div className="col-4 col-sm-3 order-sm-3">
              Status
              </div>
              <div className="col-12 col-sm-3 order-sm-1">
                Date
              </div>
              <div className="col-12 col-sm-3 order-sm-2">
                Product
              </div>
              
              
        </div>
  
          {tickets.map((ticket) => {
            return <TicketItem key={ticket._id} ticket = {ticket} />
          })}
</div>
    </div>
  )
}

export default Tickets
