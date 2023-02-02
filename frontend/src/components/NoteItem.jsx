import React from 'react'
import { useSelector } from 'react-redux'

function NoteItem({note}) {

    const {name} = useSelector(state => state.auth.user)
  return (
    <div className={note.isStaff ? 'bg-secondary bg-opacity-10 p-2 border  rounded border-secondary my-2 shadow' : ' p-2 border  rounded border-secondary my-2 '}>
            <p className='text-end d-none d-sm-block my-0 fst-italic'>{new Date(note.createdAt).toLocaleString()}</p>
            <p className='fw-bold fs-6 mb-0'>Note from {note.isStaff ? 'Staff' : 'You'}</p>
            <p className='fw-6 fw-normal font-monospace mt-0'>{note.text}</p>
            <p className='text-end my-0 d-block d-sm-none fst-italic fw-lighter'>{new Date(note.createdAt).toLocaleString()}</p>

        </div>
)
}

// 'fw-bold fs-6 mb-0'

export default NoteItem
