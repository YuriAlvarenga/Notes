import React, {useContext, useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../../context/authContext'
import Loading from '../../../context/loading'


export default function SignUp() {

    const [name, setUserName] = useState('')
    const [userNameError, setUserNameError] = useState('')
   

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    
    
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
  


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const navigate = useNavigate()

    const { SignUp, emailFounded, loading, setLoading } = useContext(AuthContext)

    //navigate para /login
    const handleSignIn = () => {
        navigate("/login")
    }

    // Validar campos de email e senha
    const frontendValidation = () => {

        if (name.trim() === '') {
            setUserNameError('Username é obrigatório')
            return
          }else if (name.length < 6) {
            setUserNameError('Username deve ter pelo menos 6 caracteres')
            return
          }

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
        setUserNameError('')
        setEmailError('')
        setPasswordError('')
      }

      async function handleSubmit(event){
        event.preventDefault()
      
        frontendValidation()
      
        // Se chegou aqui, os campos foram preenchidos corretamente
       
        setLoading(true)
        setTimeout(async () => {
          try {
            await SignUp(name, email, password)
            setLoading(false)
          } catch (error) {
            console.log(error)
            setLoading(false)
          }
        }, 1500)
          
      }
      

    return (
    
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="Name"
                                autoFocus
                                value={name}
                                onChange={(e) => setUserName(e.target.value.trim().toLowerCase())}
                                error={!!userNameError}
                                helperText={userNameError}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label= 'Email'
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!(emailError || emailFounded)}
                                helperText={emailError || emailFounded}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label = "Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!passwordError}
                                helperText={passwordError}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, position:'relative' }}>
                        Sign Up
                        <Box sx={{display: 'flex', position:'absolute', right:'15px'}}>
                            {loading && <Loading/>}
                        </Box>
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Typography onClick={handleSignIn} sx={{color:'#005b8f', cursor:'pointer'}} variant="body2">
                                Already have an account? Sign in
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
  )
}