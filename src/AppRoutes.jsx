import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom"

import Home from "./pages/home/home"
import SignUp from "./components/forms/signup/sign-up"
import SignIn from "./components/forms/login/login"


export default function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route exact path="/login" element={<SignIn/>}/>
                <Route exact path="/signup" element={<SignUp/>}/>
                <Route exact path="/" element={<Home/>}/>
            </Routes>
        </Router>
    )
}