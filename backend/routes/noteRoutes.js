const express = require('express')
const { createNote, getNotes } = require('../controllers/noteController')
const { authenticate } = require('../middlewares/authMiddleware')

//ceating router object
//Router -- note
const router = express.Router({mergeParams : true})


//api -- api/tickets/:ticketId/notes
//method -- get and post both
//service -- get notes , create a note
router.route('/').get([authenticate , getNotes]).post([authenticate, createNote])


//exporting the note router
module.exports  = router