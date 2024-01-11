import React, { useState, useContext } from "react"

import Typography from '@mui/material/Typography'
import { Box, Divider } from "@mui/material"
import { NoteContext } from "../../context/notesContext"
import CardNotePriority from "./card-note-priority"
import CardNoteNoPriority from "./card-no-priority"




export default function NoteCreated(){
    
   const { task } = useContext(NoteContext)

    // abre menu dentro de card notas

    const [menuState, setMenuState] = useState({})
    const handleMenuCard = (taskId) => {
        setMenuState(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }))
    }
    
    
    return(
        <Box sx={{display:'flex', flexDirection:'column', width: '100%'}}>
            {task.length > 0 ? (
                <Box>
                    <CardNotePriority menuState={menuState} handleMenuCard={handleMenuCard} />
                    
                    {task.some(task => task.priority) && (
                        <Divider sx={{ m: 4 }} />
                    )}

                    <CardNoteNoPriority menuState={menuState} handleMenuCard={handleMenuCard} />

                        
                </Box>
                ):(
                <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Typography>Nothing to see</Typography>
                </Box>
            )}  
        </Box>

    )  
}


