import React from 'react'
import {BsPersonFill} from 'react-icons/bs'
import {useState} from 'react'
import {  toast } from 'react-toastify';



function Register() {

  const [formData , setFormData] = useState({
    name : '',
    email : '',
    password : '',
    password2 : ''
  })

  const {name , email , password , password2} = formData

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
            <h2 className='fw-bolder'> <BsPersonFill/><span>Register</span></h2>
            <h4 className='fw-bolder text-secondary'>Please create an account</h4>
          </div>
          <div>
            <form action="">
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