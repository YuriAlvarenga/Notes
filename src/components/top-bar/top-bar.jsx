import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography  from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'



export default function TopBar(){

    // abre e fecha menu user/logout
    const [ showMenu, setShowMenu ] = useState(null)
    const open = Boolean(showMenu)

    const handleOpenMenu = (event) =>{
        setShowMenu(showMenu ? null : event.currentTarget)
    }
   


    //data atual
    const dataAtual = new Date()
    const dia = String(dataAtual.getDate()).padStart(2, '0')
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0')
    const ano = dataAtual.getFullYear()

    const dataFormatada = `${dia}/${mes}/${ano}`
        const { Logout, user } = useContext(AuthContext)
    return(
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} >
            <Toolbar>
                <Grid container spacing={1} alignItems="center" justifyContent='center'>
                    <Grid >
                        <Typography variant="h6">
                            MyNotes
                        </Typography>
                    </Grid>
                    <StickyNote2Icon sx={{ color: '#ADD8E6' }}/>   
                    <Grid item xs />
                        <CalendarMonthIcon sx={{ mr: 1, color: '#ADD8E6', fontSize: 18  }}/>
                    <Grid sx={{ mr: 1, fontSize: 14 }}>
                        {dataFormatada}
                    </Grid>
                    <Grid>
                        <Button sx={{ color:'#FFF', fontSize:12, mt: 0.2, cursor: 'pointer'}} id="basic-button" aria-controls={open ? 'basic-menu' : undefined}  onClick={handleOpenMenu}>
                            {user}
                        </Button>
                        <Menu sx={{ml:1, cursor: 'pointer'}} id="basic-menu" anchorEl={showMenu}  open={Boolean(showMenu)} onClose={() => setShowMenu(null)}>
                            <MenuItem sx={{fontSize:12}} onClick={Logout}>Logout</MenuItem>       
                        </Menu>     
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        
    )   
}
