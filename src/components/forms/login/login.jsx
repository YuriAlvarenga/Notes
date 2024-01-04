import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from "react-router-dom"
import axios from 'axios'


const defaultTheme = createTheme()

export default function SignIn() {
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailNotFound, setEmailNotFound] = useState('')
    const [passwordNotFound, setPasswordNotFound] = useState('')

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const navigate = useNavigate()


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
      try {
        const response = await axios.post('http://localhost:8000/login', {
          email,
          password
        })

        if (response.status === 200){
          navigate('/')
        }
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Typography onClick={handleSignUp} sx={{color:'blue', cursor:'pointer'}} variant="body2">
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