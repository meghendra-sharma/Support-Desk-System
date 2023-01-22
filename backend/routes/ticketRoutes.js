const express = require('express')
const { authenticate } = require('../middlewares/authMiddleware')
const {getTickets , createTicket} = require('../controllers/ticketController')

//creating router object
//router -- tickets
const router = express.Router()

//api -- api/tickets
//method -- get and post both
//service -- get tickets , create tickets
router.route('/').get([authenticate , getTickets]).post([authenticate , createTicket])

module.exports = router