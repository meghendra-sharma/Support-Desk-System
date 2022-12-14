const express = require("express")
const { registerUser, loginUser } = require("../controllers/userController")
const router = express.Router()

//Register user route
router.post("/" , registerUser)

//Login user route
router.post("/login", loginUser)


module.exports = router