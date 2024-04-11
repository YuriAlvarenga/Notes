import React, { useState, useContext } from "react"
import { Box, List, ListItem, ListItemButton, ListItemText, Drawer, AppBar, IconButton, Toolbar, Typography, useMediaQuery, useTheme, Menu, MenuItem, Grid , Button} from "@mui/material"
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import MenuIcon from '@mui/icons-material/Menu'
import { AuthContext } from '../../context/authContext'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { SharedContext } from "../../context/sharedContext"




export default function TopBar(props) {

    const { Logout, user } = useContext(AuthContext)
    const { unreadNotesCount, setCountNotification } = useContext(SharedContext)

    const markNotesAsRead = () => {
        setCountNotification(0)
      }


    const [activeItem, setActiveItem] = useState(1)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const itemsMenu = [
        {
            name: "Menu",
            children: [
                { id: 1, name: "My Notes" },
                { id: 2, name: "Shared Notes" },
                { id: 3, name: "Settings" },
            ],
        },
    ]

    const handleItemClick = (id) => {
        props.handleItemClick(id)
        setActiveItem(id)
        setIsMenuOpen(false)
        
    }

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen)
        markNotesAsRead()
    }

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
    

    const renderMenuItems = () => (
        <div>
            {itemsMenu.map(({ name, children }) => (
                <React.Fragment key={name}>
                    <ListItem sx={{  fontSize: 22, color: '#fff', mb: 4, mt: 1 }}>
                        <Typography variant="body3" sx={{ml:4}}>
                            {name}
                        </Typography>
                        </ListItem>
                    {children.map(({ id, name: childName }) => (
                        <ListItem disablePadding key={id}>
                            <ListItemButton selected={activeItem === id} sx={{color: 'rgba(255, 255, 255, 0.7)', boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset', py: 1, px: 3}} onClick={() => handleItemClick(id)}>
                                <ListItemText>{childName}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )

    return (
        <Box sx={{ flexGrow: 1, mb:2, fontFamily: 'cursive' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid container spacing={1} alignItems="center" justifyContent='center'>
                        <Grid sx={{ position: 'relative' }}>
                            
                            <Typography sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: 8 }}>1</Typography>
                            
                            <IconButton aria-label="open drawer" onClick={handleMenuToggle} sx={{ color: '#FFF' }}>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
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
                        <Button sx={{fontFamily: 'cursive', color:'#FFF', fontSize:12, mt: 0.2, cursor: 'pointer'}} id="basic-button" aria-controls={open ? 'basic-menu' : undefined}  onClick={handleOpenMenu}>
                            {user}
                        </Button>
                        <Menu sx={{ml:1, cursor: 'pointer'}} id="basic-menu" anchorEl={showMenu}  open={Boolean(showMenu)} onClose={() => setShowMenu(null)}>
                            <MenuItem sx={{fontSize:12, fontFamily: 'cursive'}} onClick={Logout}>Logout</MenuItem>       
                        </Menu>     
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={isMenuOpen}
                onClose={handleMenuToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                    },
                }}
            >
                <List disablePadding sx={{background: '#101F33', height:'100vh'}}>
                    {renderMenuItems()}
                </List>
            </Drawer>
        </Box>
    )
}
