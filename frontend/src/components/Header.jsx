import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {RiLoginBoxFill , RiLogoutBoxLine} from 'react-icons/ri'
import {BsPersonFill} from 'react-icons/bs'
import { useSelector , useDispatch} from 'react-redux'
import { logout , reset} from '../features/auth/authSlice'





function Header() {

  //initializing the dispatch
  const dispatch = useDispatch()

  //initializing the navigate
  const navigate = useNavigate()

  //getting the user from the global state - auth
  const {user} = useSelector((state) => {
    return state.auth
  })

  //button-logout
  //calls the redux middleware -- logout,reset
  function onClick(){

    //dispatching the asynchronus action -- logout
    dispatch(logout())

    //dispatching the synchronus action -- reset
    dispatch(reset())

    //navigating to the home route
    navigate('/')
  }


  return (
    <div>
    <nav className="navbar bg-light mx-sm-4">
    <div className="container-fluid">
      {/* <a class="navbar-brand">Navbar</a> */}
      <h3 className='fw-bolder'><Link className=' navbar-brand ps-2' to  = '/' > Support Desk</Link></h3>
      <div className='d-flex justify-content-between'>
        {user ? <><h5 onClick={onClick} className='fw-bolder'><Link  className='p-2 align-middle mb-0 text-decoration-none text-dark' > <RiLogoutBoxLine/> Logout </Link></h5></> : 
        <>
        <h5 className='fw-bolder'><Link to= '/login' className='p-2 align-middle mb-0 text-decoration-none text-dark' > <RiLoginBoxFill/> Login </Link></h5>
        <h5 className='fw-bolder'><Link to= '/register' className='p-2 align-middle mb-0 text-decoration-none text-dark' > <BsPersonFill/> Register </Link></h5>
        </>}
        
      </div>
      
    </div>
    
  </nav>
  <hr className = 'my-0'/>
  
  </div>
  )
}

export default Header