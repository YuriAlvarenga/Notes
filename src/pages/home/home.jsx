import React, { useState } from "react"
import Toolbar from '@mui/material/Toolbar'

import { Box, Divider, Typography } from "@mui/material"
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import TopBar from "../../components/top-bar/top-bar"
import Sidebar from "../../components/sidebar/sidebar"
import ButtonCreateNote from "../../components/create-note/button-create-note"
import CreateNote from "../../components/create-note/create-note"
import NoteCreated from "../../components/note-created/note-created"


export default function Home(){

    //função que mostra o item que está sendo clicado através dos estados itemMenuLateral passado como props
    const [itemSideBar, setitemSideBar] = useState(0)
    const handleItemClick = (id) => {
      setitemSideBar(id)
    }
  

    // mostra card quando botão criar nota é acionado
    const [ showCard, setShowCard ] = useState(true)

    const handleOpenCard = () =>{
      setShowCard(false)
    }
    const handleCloseCard = () => {
      setShowCard(true)
    }

    
    return(
       
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopBar/> 
        <Drawer variant="permanent" sx={{width: 240,flexShrink: 0,[`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' }}}>
          <Toolbar />
          <Sidebar handleItemClick={handleItemClick} />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
          <Toolbar/>
          {itemSideBar === 1 ?(
            <>
              {showCard ? <ButtonCreateNote handleOpenCard={handleOpenCard}/> : (<CreateNote handleCloseCard={handleCloseCard}/>)}
              <Divider sx={{ m: 4, width:"100%" }} />
              <NoteCreated/>
            </>
          ) : itemSideBar === 2 ? (
            <Typography> Soon</Typography>
          ) : itemSideBar === 3 ?(
            <Typography>settings</Typography>
          )
          : (
            <>
              {showCard ? <ButtonCreateNote handleOpenCard={handleOpenCard}/> : (<CreateNote handleCloseCard={handleCloseCard}/>)}
              <Divider sx={{ m: 4, width:"100%" }} />
              <NoteCreated/>
            </>
          )}
        </Box>
      </Box>
     
    )
}