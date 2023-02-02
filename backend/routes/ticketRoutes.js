const express = require('express')
const { authenticate } = require('../middlewares/authMiddleware')
const {getTickets , createTicket, getSingleTicket, deleteSingleTicket, updateSingleTicket} = require('../controllers/ticketController')

//creating router object
//router -- tickets
const router = express.Router()

//adding router -- note
//added note router into the ticket router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes',noteRouter)

//api -- api/tickets
//method -- get and post both
//service -- get tickets , create ticket
router.route('/').get([authenticate , getTickets]).post([authenticate , createTicket])

//api -- api/tickets/:ticketId
//method -- get , put and delete method
//service -- get single ticket , update a ticket , delete a ticket

router.route('/:ticketId').get([authenticate , getSingleTicket]).delete([authenticate,deleteSingleTicket]).put([authenticate,updateSingleTicket])

module.exports = router