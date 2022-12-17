const express = require("express")
const { registerUser, loginUser ,getMe} = require("../controllers/userController")
const { authenticate } = require("../middlewares/authMiddleware")
const router = express.Router()

//Register user route
router.post("/" , registerUser)

//Login user route
router.post("/login", loginUser)

//return the user details if authorised
router.get("/me" ,[authenticate, getMe])


module.exports = router