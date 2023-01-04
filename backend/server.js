const express = require("express")
const {errorHandler} = require("./middlewares/errorMiddleware")
const dotenv = require("dotenv").config()
const {connectDB} = require("./config/db")
const cors = require('cors')


//Setting up the port on which server will listen the requests and send response.
const PORT = process.env.PORT

//connecting with the mongoDB database using mongoose library
connectDB()


//Creating express app
const app = express()

//adding middleware - bodyParser
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//comment needs to be added
app.use(cors())

//Home route of application
app.get("/" , (req,res) => {
    res.send("Welcome to the support desk")
})


//User Routes -- register,login
app.use("/api/users" , require("./routes/userRoutes"))

//middleware -- errorHandler
app.use(errorHandler)


//Setting up the server listen to the specific port.
app.listen(PORT , () => {
    console.log("Server is running on port " + PORT)
})


