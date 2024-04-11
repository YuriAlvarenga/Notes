import React, { useState } from "react"
import Toolbar from '@mui/material/Toolbar'
import { Box, Divider, Typography } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline'
import TopBar from "../../components/topbar/topbar"
import ButtonCreateNote from "../../components/create-note/button-create-note"
import CreateNote from "../../components/create-note/create-note"
import NoteCreated from "../../components/note-created/note-created"
import CardNoteSharedPriority from "../../components/notes-shared/notes-shared-priority"

export default function Home() {
  //função que mostra o item que está sendo clicado através dos estados itemMenuLateral passado como props
  const [itemSideBar, setitemSideBar] = useState(0)
  const handleItemClick = (id) => {
    setitemSideBar(id)
  }

  // mostra card quando botão criar nota é acionado
  const [showCard, setShowCard] = useState(true)

  const handleOpenCard = () => {
    setShowCard(false)
  }
  const handleCloseCard = () => {
    setShowCard(true)
  }


  return (
    <Box>
      <CssBaseline />
        <Toolbar/>
        <TopBar handleItemClick={handleItemClick}/>
        {itemSideBar === 1 ? (
           <Box sx={{ display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', m:3}}>
           {showCard ? <ButtonCreateNote handleOpenCard={handleOpenCard} /> : (<CreateNote handleCloseCard={handleCloseCard} />)}
           <Divider sx={{ m: 4, width: "90%" }} />
            <NoteCreated />
         </Box>
        ) : itemSideBar === 2 ? (
          <CardNoteSharedPriority/>
        ) : itemSideBar === 3 ? (
          <Typography>settings</Typography>
        )
          : (
            <Box sx={{ display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', m:3}}>
              {showCard ? <ButtonCreateNote handleOpenCard={handleOpenCard} /> : (<CreateNote handleCloseCard={handleCloseCard} />)}
              <Divider sx={{ m: 4, width: "90%" }} />
              <NoteCreated />
              
            </Box>
          )}
      
      <Toolbar />
    </Box>
  )
}
