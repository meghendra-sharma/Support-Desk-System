import React from 'react'
import { useState } from 'react'
import {BiBookAdd} from 'react-icons/bi'

function Modal({addNote , ticketStatus}) {


    //local state
    const [modalText , setModalText] = useState('')


    //setting local state when the input changes
    //input -- modalText
    function onChange(event){
        const text = event.target.value
        setModalText(text)
    }

    //clicking modal button
    
    function onClick(event){
        event.preventDefault()

        //calling function -- "addNote" of the parent component
        //passing the local state -- "modalText" to the parent component
        addNote(modalText)
        setModalText('')
    }


  return (
    <div>
        
{ticketStatus !== 'closed' && <button type="button" className="btn btn-dark fw-bold" data-bs-toggle="modal" data-bs-target="#addNote">
 <BiBookAdd/> Add Note
</button>}


<div className="modal fade" id="addNote" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Add Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <input onChange={onChange} value = {modalText} className='form-control border-0 font-monospace fw-bold text-secondary' type="text" name="modalText" id="modalText" placeholder='Type here..' />
      </div>
      <div className="modal-footer">
        <button onClick={onClick} type="button" className="btn btn-dark fw-bold" data-bs-dismiss="modal">Add</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Modal
