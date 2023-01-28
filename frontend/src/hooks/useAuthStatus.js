import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

//This is a custom hook or user defined hook
//Return -- whether user is logged in or not.


export const useAuthStatus = () => {

    //local states
    const [loggedIn , setLoggedIn] = useState(false)
    const [checkingStatus , setCheckingStatus] = useState(true)


    //destructuring global state
    const {user} = useSelector(state => state.auth)


    //set loggedIn -> true | if the user islogged in
    //set loggedIn -> false | if the user is not logged in or user is logged out
    //dependency -- user | global state
    useEffect(() => {
        if(user){
            setLoggedIn(true)
        }
        else{
            setLoggedIn(false)
        }
        setCheckingStatus(false)
    },[user])


    //returning the local states
    return {loggedIn , checkingStatus}
}

                                                                                                                                                                                                