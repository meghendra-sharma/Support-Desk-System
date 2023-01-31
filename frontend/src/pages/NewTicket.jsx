import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTicket, reset } from '../features/ticket/ticketSlice'
import Spinner from '../components/Spinner'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Back from '../components/Back'

function NewTicket() {
    //destructuring global state
    //state - auth
    const {user} = useSelector(state => state.auth)


    //destructuring global state
    //state - ticket
    const {isLoading , isSuccess , isError , message} = useSelector(state => state.ticket)

    
    //initializing dispatch
    const dispatch = useDispatch()

    //initializing navigate
    const navigate = useNavigate()

    //initial local state
    const initialState = {
        name : user.name,
        email : user.email,
        product : 'iPhone',
        description : ''
    }

    //creating local state
    const [formData , setFormData] = useState(initialState)

    //destructuring local state
    const {name,email,product,description} = formData


    function onChange(event){

        //name of the input that is changes
        const name = event.target.name

        //new value of input that is changes
        const value = event.target.value


        //updating the local state
        setFormData((previous) => {
            return {
                ...previous,
                [name] : value
            }
        })
    }



    function onSubmit(event){
        event.preventDefault()

        //dispatching asynchronus action
        //createTicket
        dispatch(createTicket({product , description}))
    }

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            navigate('/tickets')
        }


        //dispatching synchronus action
        //resetting the global state -- ticket
        dispatch(reset())
    },[isError , isSuccess , message , navigate , dispatch])



    //component -- Spinner
    if(isLoading){
        return <Spinner/>
    }


  return (
    <div className='container text-center my-2'>
      <div className='text-start mt-4'> <Back url='/'/> </div>
      <div className='row'>
        <div className="col-sm-6 col-lg-4 mx-auto">
          <div className='my-4 my-sm-5'>
            <h2 className='fw-bolder'> Create New Ticket</h2>
            <h4 className='fw-bolder text-secondary'>Please fill out the form below</h4>
          </div>
          <div>
            <form onSubmit={onSubmit} >
              
            <div className='form-group mb-3 mb-sm-3'>
                <label className='fw-bold text-start w-100' htmlFor = 'name'>Customer name</label>
                <input  value = {name} className='form-control text-muted bg-light fw-bold font-monospace' type="text" name="name" id="name" placeholder='Name' readonly required />
              </div>
              <div className='form-group mb-3 mb-sm-3'>
                <label className='fw-bold text-start w-100' htmlFor = 'email'>Customer email</label>
                <input  value = {email} className='form-control text-muted bg-light fw-bold font-monospace' type="email" name="email" id="email" placeholder='Email' readonly required />
              </div>
              <div className='form-group mb-3 mb-sm-3'>
                    <label className='fw-bold text-start w-100' htmlFor="product">Product</label>
                    <select onChange={onChange} value = {product} class="form-control font-monospace " name='product' id="product">
                    <option selected = {product === 'iPhone' && true}>iPhone</option>
                    <option selected = {product === 'iMac' && true}>iMac</option>
                    <option selected = {product === 'iPad' && true}>iPad</option>
                    <option selected = {product === 'Macbook Pro' && true}>Macbook Pro</option>
                    </select>              
                </div>

                <div className='form-group mb-3 mb-sm-3'>
                <label className='fw-bold text-start w-100' htmlFor="description">Description of the issue</label>
                <textarea onChange={onChange} value={description} name='description' class="form-control font-monospace" id="description" rows="2"></textarea>
                  </div>
                <div className='form-group mb-3 mb-sm-3'>
                <input className='btn btn-dark  btn-block w-100' type="submit" value="Submit"  />
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default NewTicket