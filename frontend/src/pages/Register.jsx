import React from 'react'
import {BsPersonFill} from 'react-icons/bs'
import {useState} from 'react'
import {  toast } from 'react-toastify';
import {useDispatch , useSelector} from 'react-redux'
import { register, reset } from '../features/auth/authSlice';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner';




function Register() {


  //local state of a component
  //component - register
  const [formData , setFormData] = useState({
    name : '',
    email : '',
    password : '',
    password2 : ''
  })

  //destructuring local state
  //local state  - formData
  const {name , email , password , password2} = formData


  //destructuring global state
  //global state  - auth
  //hook -- useSelector
  const {isError , isSuccess , message , isLoading , user} = useSelector((state) => {
    return state.auth
  })

  //initializing dispatch
  const dispatch = useDispatch()

  //initializing navigate
  const navigate = useNavigate()


  //runs after first render or if the global state changes
  //global state dependency  -- auth
  useEffect(() => {

    console.log('register') //for debugging purpose
    //if there is error when user register
    if(isError){
      toast.error(message)
    }

    // if the user successfully registered
    else if(isSuccess || user){

      //used to navigate through react-routes
      navigate('/')
    }

    //resetting the global state -- auth
    //action  - synchronus
    dispatch(reset())
  },[isError, isSuccess ,message,user ,  navigate , dispatch])

  function onChange(event) {
      
      const value = event.target.value 
      const inputName = event.target.name 
      setFormData((previous) => {
        return {
          ...previous,
          [inputName] : value
        }

      })
  }

  //collects all the data from the field and send it to backend server
  //validate passwords matching
  function onSubmit(event){
    event.preventDefault()
    if(password !== password2){
      toast.error("Passwords do not match")
    }
    else{
      const userData = {
        name,
        email,
        password
      }

      //action -- asynchronus
      //calling the backend register api -- api/users 
      dispatch(register(userData))
    }
  }


  //Spinner Component
  if(isLoading){
    return <Spinner/>
  }

  return (
    <div className='container text-center my-2'>
      <div className='row'>
        <div className="col-sm-6 col-lg-4 mx-auto">
          <div className='my-4 my-sm-5'>
            <h2 className='fw-bolder'> <BsPersonFill/><span>Register</span></h2>
            <h4 className='fw-bolder text-secondary'>Please create an account</h4>
          </div>
          <div>
            <form onSubmit={onSubmit}>
              <div className='form-group mb-3 mb-sm-3'>
                <input  onChange = {onChange} value = {name} className='form-control' type="text" name="name" id="name" placeholder='Name' required />
              </div>
              <div className='form-group mb-3 mb-sm-3'>
                <input onChange = {onChange} value = {email} className='form-control' type="email" name="email" id="email" placeholder='Email' required />
              </div>
              <div className='form-group mb-3 mb-sm-3'>
                <input onChange = {onChange} value = {password} className='form-control' type="password" name="password" id="password" placeholder='Password' required />
              </div>
              <div className='form-group mb-3 mb-sm-3'>
                <input onChange = {onChange} value = {password2} className='form-control' type="password" name="password2" id="password2" placeholder='Confirm Password' required />
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

export default Register