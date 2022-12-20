import React from 'react'
import {Link} from 'react-router-dom'
import {RiLoginBoxFill} from 'react-icons/ri'
import {BsPersonFill} from 'react-icons/bs'



function Header() {
  return (
    <div>
    <nav class="navbar bg-light mx-sm-4">
    <div class="container-fluid">
      {/* <a class="navbar-brand">Navbar</a> */}
      <h3 className='fw-bolder'><Link className=' navbar-brand ps-2' to  = '/' > Support Desk</Link></h3>
      <div className='d-flex justify-content-between'>
        <h5 className='fw-bolder'><Link to= '/login' className='p-2 align-middle mb-0 text-decoration-none text-dark' > <RiLoginBoxFill/> Login </Link></h5>
        <h5 className='fw-bolder'><Link to= '/register' className='p-2 align-middle mb-0 text-decoration-none text-dark' > <BsPersonFill/> Register </Link></h5>
      </div>
      
    </div>
    
  </nav>
  <hr class = 'my-0'/>
  
  </div>
  )
}

export default Header