
//middleware -- errorHandler
//def -- sends the error message and stack trace in json form
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    // console.log(res.statusCode)
    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null :  err.stack
    })
}

module.exports = {errorHandler}