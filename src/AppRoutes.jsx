import React, { useContext } from "react"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom"

import Home from "./pages/home/home"
import SignUp from "./components/forms/signup/sign-up"
import SignIn from "./components/forms/login/login"

import { AuthProvider, AuthContext } from "./context/authContext"
import { NoteProvider } from "./context/notesContext"
import { SharedProvider } from "./context/sharedContext"
import Loading from "./context/loading"

export default function AppRoutes(){

    // faz com que a página home, por exemplo, só seja acessada se authenticated for true (lógica implantada em context) - não acessa mais colocando localhost/ direto no navegador
    const Private = ({children}) =>{
        const { authenticated, loading } = useContext(AuthContext)
        if(loading){
            return <Loading/>
        }
        if(!authenticated){
            return <Navigate to="/login"/>
        }
        return children
    }

    return(
        <Router>
            <AuthProvider>
                <NoteProvider>
                    <SharedProvider>
                        <Routes>
                            <Route exact path="/login" element={<SignIn/>}/>
                            <Route exact path="/signup" element={<SignUp/>}/>
                            <Route exact path="/" element={<Private><Home/></Private>}/>
                        </Routes>
                    </SharedProvider>
                </NoteProvider>
            </AuthProvider>
        </Router>
    )
}