import React, { createContext, useState, useEffect } from "react"
import api from '../services/api'
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

export function AuthProvider({children}){

  const [ user, setUser ] = useState(null)
  const [ token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const [emailFounded, setEmailFounded] =useState('')
  const [emailNotFound, setEmailNotFound] = useState('')
  const [passwordNotFound, setPasswordNotFound] = useState('')
  

  const navigate = useNavigate()

  // useEffect para recuperar usuário e token do localstorage
 
  useEffect(() => {
    try{
      const recuperaToken = localStorage.getItem('token')
      const recuperaUser = localStorage.getItem('user')
      if (recuperaUser) {
        setUser(JSON.parse(recuperaUser))
      }
      if (recuperaToken) {
        setToken(recuperaToken)
      }
      setLoading(false)
    }catch(error){
      console.error('error userEffect:', error)
      setLoading(false)
    }
  }, [])

  async function Login(email, password){
    try {
      const response = await api.post('/login', {
        email,
        password
      })

      
      const { access_token } = response.data
      const { user } = response.data
      setToken(access_token)
      
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", access_token)
      
      if(response.status === 200){
        setUser(user)
        //setLoading(true)
        setTimeout(() =>{
          navigate('/')
        }, 2000)
      }
      
      setEmailNotFound('')
      setPasswordNotFound('')
      setEmailFounded('')

      }catch (error) {
        if (error.response) {
          // O servidor respondeu com um código de status diferente de 2xx
          console.error('Detalhes da resposta:', error.response.data)
          console.error('Código de status HTTP:', error.response.status)
        }
        if (error.response.status === 404) {
          // Se o status for 404, significa que o email não foi encontrado
          setEmailNotFound('Email não cadastrado')
        }else{
          setEmailNotFound('')
        }
        if (error.response.status === 401) {
          // Se o status for 401, significa que a senha é incorreta
          setPasswordNotFound('Senha incorreta')
        }else{
          setPasswordNotFound('')
        }
      }
  }


  // função de logout
  async function Logout(){
    try{
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      setUser("")
      setToken("")
      navigate("/login")
    }
    catch(error){
      alert("falha no logout")
      if (error.response) {
        // O servidor respondeu com um código de status diferente de 2xx
        console.error('Detalhes da resposta:', error.response.data)
        console.error('Código de status HTTP:', error.response.status)
      }
    }
  }
  
  // função SignUp
  async function SignUp(name, email, password){
    try{
      const response = await api.post("/signup",{
        name,
        email,
        password
      })
      if(response.status === 200){
        console.log("cadastrado com sucesso")
      }
      if (response.status === 201){
        navigate('/login')
      }
    }
    catch (error) {
      if (error.response) {
      // O servidor respondeu com um código de status diferente de 2xx
        console.error('Detalhes da resposta:', error.response.data)
        console.error('Código de status HTTP:', error.response.status)
      }
      if(error.response.status === 400){
        setEmailFounded('Email já cadastrado')
      }
    }
  }


  return(
    <AuthContext.Provider value={{authenticated: !!user, user, token, loading, setLoading, Login, emailNotFound, passwordNotFound, Logout, SignUp, emailFounded}}>
      {children}
    </AuthContext.Provider>
  )
}