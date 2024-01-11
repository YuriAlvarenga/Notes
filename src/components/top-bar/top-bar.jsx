import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import IconButton from '@mui/material/IconButton'


import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'





export default function TopBar(){

    //data atual
  const dataAtual = new Date()
  const dia = String(dataAtual.getDate()).padStart(2, '0')
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0')
  const ano = dataAtual.getFullYear()

  const dataFormatada = `${dia}/${mes}/${ano}`
    const { Logout, user } = useContext(AuthContext)
    return(
        <AppBar color="primary" position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, background: '#101F33'}} >
            <Toolbar>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        Notes List
                    </Grid>
                    <Grid item xs />
                    <Grid item>
                        <CalendarMonthIcon sx={{ mr: 1 }}/>
                        {dataFormatada}
                    </Grid>
                    <Grid item>
                        {user}
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" sx={{ fontSize: 18 }} onClick={Logout}>
                            logout
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        
    )   
}
