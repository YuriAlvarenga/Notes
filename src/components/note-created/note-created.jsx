import React, { useState, useContext } from "react"

import Typography from '@mui/material/Typography'
import { Box, Divider} from "@mui/material"
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
    
    
    return (
        <React.Fragment>
            {task.length > 0 ? (
                <React.Fragment>
                    <CardNotePriority menuState={menuState} handleMenuCard={handleMenuCard} handleEditClick={handleEditClick} />
                    {task.some(task => task.priority) && (
                        <Divider sx={{ m:2, width:'95%'}} />
                    )}
                    <CardNoteNoPriority menuState={menuState} handleMenuCard={handleMenuCard} handleEditClick={handleEditClick} />
                </React.Fragment>
       
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>Nothing to see</Typography>
                </Box>
            )}
        </React.Fragment>
    )
}