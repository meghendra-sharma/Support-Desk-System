import React from 'react'
import { Link } from 'react-router-dom'
import {TiArrowBack} from 'react-icons/ti'

function Back({url}) {
  return (
    <div>
      <Link to={url} className= 'btn btn-outline-dark fw-bold'> <TiArrowBack/> Back</Link>
    </div>
  )
}

export default Back
