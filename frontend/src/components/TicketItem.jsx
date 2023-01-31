import React from 'react'
import { Link } from 'react-router-dom'

function TicketItem({ticket}) {
  return (
    <div className="row py-2 mb-4 rounded  bg-secondary bg-opacity-10 fw-semibold">

              <div className="col-4 col-sm-3 order-sm-3 font-monospace">
              <span className={ticket.status === 'new' ? "badge  text-bg-danger bg-opacity-100" : ticket.status === 'open' ? 'badge text-bg-warning bg-opacity-100' : 'badge text-bg-success bg-opacity-100' }>{ticket.status}</span>
                </div>
              <div className="col-12 col-sm-3  order-sm-1 font-monospace">
                  {new Date(ticket.createdAt).toLocaleString()}
                </div>
                <div className="col-12 col-sm-3  order-sm-2 font-monospace">
                  {ticket.product}
                </div>
                
                <Link to={`/ticket/${ticket._id}`} className="col-12 col-sm-3  order-sm-4 font-monospace btn btn-outline-dark  fw-semibold border border-dark border-2  ">
                    View
                </Link>
          </div>
  )
}

export default TicketItem

