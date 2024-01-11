import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import IconButton from '@mui/material/IconButton'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'

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
        <AppBar color="primary" position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} >
            <Toolbar>
                <Grid container spacing={1} alignItems="center" justifyContent='center'>
                    <Grid >
                        MyNotes
                    </Grid>
                    <StickyNote2Icon sx={{ ml: 1, color: '#ADD8E6' }}/>   
                    <Grid item xs />
                        <CalendarMonthIcon sx={{ mr: 1, color: '#ADD8E6', fontSize: 18  }}/>
                    <Grid sx={{ mr: 1, fontSize: 14 }}>
                        {dataFormatada}
                    </Grid>
                    <Grid sx={{ fontSize: 15 }} >
                        {user}
                    </Grid>
                    <Grid >
                        <IconButton color="inherit" sx={{ fontSize: 16 }} onClick={Logout}>
                            logout
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        
    )   
}
