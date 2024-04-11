import React, { useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../../context/authContext'
import Loading from '../../../context/loading'

const defaultTheme = createTheme()

export default function SignIn() {
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const navigate = useNavigate()
    const { Login, emailNotFound, passwordNotFound, loading, setLoading } = useContext(AuthContext) // recebe as variáveis de auth em context


    //navigate para signup
    const handleSignUp = () =>{
        navigate('/signup')
    }

    // Validar campos de email e senha
    const frontendValidation = () => {
      if (email.trim() === '') {
        setEmailError('Email é obrigatório')
        return
      }else if (!emailRegex.test(email)) {
        setEmailError('Email inválido')
        return
      }
    
      if (password.trim() === '') {
        setPasswordError('Senha é obrigatória')
        return
      }else if (password.length < 6) {
        setPasswordError('A senha deve ter pelo menos 6 caracteres')
        return
      }
          
      // Limpar mensagens de erro
      setEmailError('')
      setPasswordError('')
    }

    //cor do botão sign up para cor de sucesso
    const [buttonColor, setButtonColor] = useState('primary')

    //Login 
    async function handleSubmit(event){
      event.preventDefault()
      frontendValidation()
      // Se chegou aqui, os campos foram preenchidos corretamente
      setLoading(true)
      setTimeout(async () => {
        try {
          await Login(email, password)
          setLoading(false)
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }, 1500)
    }
    

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label= 'Email'
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!(emailError || emailNotFound)}
              helperText={emailError || emailNotFound}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label = "Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!(passwordError || passwordNotFound)}
              helperText={passwordError || passwordNotFound}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, position:'relative' }}>
              Sign In 
              <Box sx={{display: 'flex', position:'absolute', right:'15px'}}>
                {loading && <Loading/>}
              </Box>
            </Button>
            <Grid container sx={{ display:'flex', justifyContent:"flex-end" }}>
              <Grid item >
                <Typography onClick={handleSignUp} sx={{color:'#005b8f', cursor:'pointer'}} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
     
      </Container>
    </ThemeProvider>
  )
}