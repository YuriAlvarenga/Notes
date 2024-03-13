import React, { useState } from "react"
import Toolbar from '@mui/material/Toolbar'
import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline'
import TopBar from "../../components/top-bar/top-bar"
import Sidebar from "../../components/sidebar/sidebar"
import ButtonCreateNote from "../../components/create-note/button-create-note"
import CreateNote from "../../components/create-note/create-note"
import NoteCreated from "../../components/note-created/note-created"

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

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      {!isMobile && <TopBar />}
      
      <Sidebar handleItemClick={handleItemClick} />
      
      <Box sx={{ marginTop: '64px', width:  !isMobile ? 'calc(100% - 260px)' : '100%'  }}>
        <Toolbar />
        {itemSideBar === 1 ? (
          <Box >
            {showCard ? <ButtonCreateNote handleOpenCard={handleOpenCard} /> : (<CreateNote handleCloseCard={handleCloseCard} />)}
            <Divider sx={{ m: 4, width: "90%" }} />
            <NoteCreated />
          </Box>
        ) : itemSideBar === 2 ? (
          <Typography> Soon</Typography>
        ) : itemSideBar === 3 ? (
          <Typography>settings</Typography>
        )
          : (
            <Box >
              {showCard ? <ButtonCreateNote handleOpenCard={handleOpenCard} /> : (<CreateNote handleCloseCard={handleCloseCard} />)}
              <Divider sx={{ m: 4, width: "90%" }} />
              <NoteCreated />
            </Box>
          )}
      </Box>
    </Box>
  )
}
