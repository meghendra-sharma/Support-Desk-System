const mongoose = require("mongoose")

//@function -- connecting with the database instance
//mongoDB database connection
//mongoose
const connectDB = async () => {

    try{
        //waiting for the returned promise to be completed either fullfilled or rejected
        const conn =  await mongoose.connect(process.env.MONGO_URL)
        console.log("the connection is successful : " + conn.connection.host)
    }
    //catching the error 
    catch(error){
        console.log("this is error: " + error.message)
        process.exit(1)
    }
    
}

module.exports =  {connectDB}