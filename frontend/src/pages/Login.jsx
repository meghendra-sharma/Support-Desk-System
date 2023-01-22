import React from 'react'
import { useState , useEffect } from 'react'
import {RiLoginBoxFill} from 'react-icons/ri'
import { useDispatch ,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login ,reset} from '../features/auth/authSlice'
import {  toast } from 'react-toastify';


function Login() {

  const [formData , setFormData] = useState({
    email : '',
    password : ''
  })


  const dispatch = useDispatch()

  const navigate = useNavigate()

  //destructuring local state
  //local state  - formData
  const {email,password} = formData


   //destructuring global state
  //global state  - auth
  //hook -- useSelector
  const {isError , isSuccess , message , isLoading , user} = useSelector((state) => state.auth)



  //runs after first render or if the global state changes
  //global state dependency  -- auth
  useEffect(() => {

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

function onSubmit(event){
  event.preventDefault()
  const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }



  return (
    <div className='container text-center my-2'>
      <div className='row'>
        <div className="col-sm-6 col-lg-4 mx-auto">
          <div className='my-4 my-sm-5'>
            <h2 className='fw-bolder'> <RiLoginBoxFill/><span>Login</span></h2>
            <h4 className='fw-bolder text-secondary'>Please login to get the Support</h4>
          </div>
          <div>
            <form onSubmit={onSubmit}>
              
              <div className='form-group mb-3 mb-sm-3'>
                <input onChange = {onChange} value = {email} className='form-control' type="email" name="email" id="email" placeholder='Email' required />
              </div>
              <div className='form-group mb-3 mb-sm-3'>
                <input onChange = {onChange} value = {password} className='form-control' type="password" name="password" id="password" placeholder='Password' required />
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

export default Login