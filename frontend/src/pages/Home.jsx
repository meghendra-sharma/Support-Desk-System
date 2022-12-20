import React from 'react'
import {Link} from  'react-router-dom'
import {AiOutlineFundView} from 'react-icons/ai'
import {BsQuestionDiamondFill} from 'react-icons/bs'

function Home() {
  return (
    <div className='container text-center my-2'>
      <div className='row'>
        <div className="col-sm-6 col-lg-4 mx-auto">
          <div className='my-4 my-sm-5'>
            <h2 className='fw-bold'> What do you need help with? </h2>
            <h4 className='fw-bold text-secondary'>Please Choose from an option below</h4>
          </div>
          <div>
            <div class="d-grid gap-3">
              <Link class="btn btn-light border border-dark fw-bold" to='new-ticket'><BsQuestionDiamondFill/> Create New Ticket</Link>
              <Link class="btn btn-dark fw-bold" to='tickets'> <AiOutlineFundView/> View My Tickets</Link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home