import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function TopBar(){
    return(
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ display: 'flex', justifyContent:'space-between' }} >
                <Typography variant="h6" noWrap component="div">
                    Notes List
                </Typography>
                <Button color="inherit">Logout</Button> 
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>

    )   
}
