//@desc -- register a user
//@route -- api/users/
//@access -- public

const registerUser = (req,res) => {

    //parsing the request object
    //destructuring the req.body
    const {name , email , password} = req.body

    //validation
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please enter all fields") // calling errorHandler -- middleware
    }
    else{
        res.send("I am register api")
    }
}

//@desc -- authenticate a user
//@route -- api/users/login
//@access -- public

const loginUser = (req,res) => {
    res.send("i am login api")
}

module.exports = {
    registerUser,
    loginUser
}