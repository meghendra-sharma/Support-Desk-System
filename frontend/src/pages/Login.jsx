import React from 'react'
import { useState } from 'react'
import {RiLoginBoxFill} from 'react-icons/ri'


function Login() {

  const [formData , setFormData] = useState({
    email : '',
    password : ''
  })

  const {email,password} = formData


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


  return (
    <div className='container text-center my-2'>
      <div className='row'>
        <div className="col-sm-6 col-lg-4 mx-auto">
          <div className='my-4 my-sm-5'>
            <h2 className='fw-bolder'> <RiLoginBoxFill/><span>Login</span></h2>
            <h4 className='fw-bolder text-secondary'>Please login to get the Support</h4>
          </div>
          <div>
            <form action="">
              
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