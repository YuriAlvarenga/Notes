import React, { useState, useContext } from "react"

import Typography from '@mui/material/Typography'
import { Box, Divider, useMediaQuery, useTheme} from "@mui/material"
import { NoteContext } from "../../context/notesContext"
import CardNotePriority from "./card-note-priority"
import CardNoteNoPriority from "./card-no-priority"




export default function NoteCreated(){
    
   const { task, setEditingTaskId } = useContext(NoteContext)

    // abre menu dentro de card notas

    const [menuState, setMenuState] = useState({})
    const handleMenuCard = (taskId) => {
        setMenuState(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }))
    }
    // botao para editar notas passados para cards no priority e priority
    const handleEditClick = (taskId) =>{
        setEditingTaskId(taskId)
    }

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    
    return (
        <Box  sx={{fontFamily: 'cursive',  display: 'flex', flexDirection:'column', alignItems: isMobile ? 'center' : 'start', justifyContent:isMobile ? 'center' : 'start', width:'100%'}}>
            {task.length > 0 ? (
                    <React.Fragment>
                        <CardNotePriority menuState={menuState} handleMenuCard={handleMenuCard} handleEditClick={handleEditClick} />
                        {task.some(task => task.priority) && (
                            <Divider sx={{ width:'100%'}} />
                        )}
                        <CardNoteNoPriority menuState={menuState} handleMenuCard={handleMenuCard} handleEditClick={handleEditClick} />
                    </React.Fragment>
       
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Typography>Nothing to see</Typography>
                </Box>
            )}
       </Box>
        
    )
}