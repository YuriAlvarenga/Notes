import React, { useContext, useState } from "react"

import Typography from '@mui/material/Typography'
import { Box, Divider } from "@mui/material"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import { NoteContext } from "../../context/notesContext"
import UpdateNote from "./card-updated"



export default function CardNoteNoPriority(props){  //recebe menuState, handleMenuCard e handleEditClick de note-created.jsx  

    const { task, DeleteTask, editingTaskId, setEditingTaskId } = useContext(NoteContext)

    return(
        
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', mt: 4}}>
            {task.filter(task => !task.priority).map(task =>
               editingTaskId === task.id ? (
                    <UpdateNote key={task.id} taskId={task.id} handleMenuCard={props.handleMenuCard} />
                ) : (
                    <Card key={task.id} sx={{ width: 200, height: 174, display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', mr: 4, backgroundColor: '#ADD8E6'}}>
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                            <Typography sx={{ fontSize: 14, display:'flex', justifyContent:'center', width: '100%', m:1 }}>{task.title} </Typography>
                            <Divider sx={{backgroundColor: task.priority ? '#FFF' : '#000', width: '100%'}}/>
                        </Box>
                        <Typography sx={{display: 'flex', textAlign:'justify', m: 2, '& fieldset': { border: 'none' }, fontSize: 12,}}>{task.task}</Typography>
                        <CardActions sx={{display:'flex', width: '100%'}}>
                            {props.menuState[task.id] ? (<CloseIcon sx={{fontSize: 16, cursor: 'pointer'}} onClick={() => props.handleMenuCard(task.id)}/>) : (<MenuIcon sx={{fontSize: 16, cursor: 'pointer'}} onClick={() => props.handleMenuCard(task.id)}/> )}
                                {props.menuState[task.id] && (
                                <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-around'}}>
                                    <Typography sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}><InfoIcon sx={{fontSize:16, color:'#4169E1'}}/></Typography>
                                    <Typography onClick={() => props.handleEditClick(task.id)} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}><EditIcon sx={{fontSize:16, color:'#20B2AA'}}/></Typography>
                                    <Typography  sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}><DeleteIcon onClick={() => DeleteTask(task.id)} sx={{fontSize:16, color:'red'}}/></Typography>
                                </Box>
                                )}
                        </CardActions>
                    </Card>
                )
            )}
        </Box>
    )
}