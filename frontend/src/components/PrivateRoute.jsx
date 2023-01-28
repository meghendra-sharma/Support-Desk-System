import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

function PrivateRoute() {

//This is a private route
//Any route which is private has to render this PrivateRoute component First.
//Here in this case "NewTicket" is the private route therefore we have wrap 
//that route inside "PrivateRoute" component 

//<Outlet> refers to the child elements/routes of PrivateRoute component


//calling user defined hook
  const {loggedIn , checkingStatus} = useAuthStatus()

  if(checkingStatus){
    return <Spinner/>
  }
  return loggedIn ? <Outlet/> : <Navigate to='/login'/>
}

export default PrivateRoute