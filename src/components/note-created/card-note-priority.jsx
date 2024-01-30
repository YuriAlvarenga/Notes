import React, { useContext } from "react"

import Typography from '@mui/material/Typography'
import { Box, Divider } from "@mui/material"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Tooltip from '@mui/material/Tooltip'
import { NoteContext } from "../../context/notesContext"
import UpdateNote from "./card-updated"


export default function CardNotePriority(props){ //recebe menuState, handleMenuCard e handleEditClick de note-created.jsx  

    const { task, DeleteTask, editingTaskId, noteDetails } = useContext(NoteContext)


    return(
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', flexWrap: 'wrap', background:"orange"}}>
            {task.filter(task => task.priority).map(task =>
                editingTaskId === task.id ? (
                    <UpdateNote key={task.id} taskId={task.id} handleMenuCard={props.handleMenuCard} />
                ) : (
                    <Card key={task.id} sx={{ width: 200, height: 174, display: 'flex', flexDirection:'column', justifyContent:'space-between', backgroundColor: task.priority ? '#F4998D' : 'inherit', color: task.priority ? '#FFF' : '#000'}}>
                        <Box sx={{overflow: 'auto', display:'flex', flexDirection:'column'}}>
                            <Typography sx={{ fontSize: 14, display:'flex', justifyContent:'center', width: '100%', mt: 1, mb: 0.5 }}>{task.title} </Typography>
                            <Divider sx={{backgroundColor: task.priority ? '#FFF' : '#000', width: '80%', m:0, mx: 'auto'}}/>
                            <Typography sx={{ display: 'flex', textAlign: 'start', ml: 2, mt: 1, overflow:'auto', scrollbarWidth: 'thin',  WebkitOverflowScrolling: 'touch', fontSize: 12, }}>
                                {task.task}
                            </Typography>
                        </Box>
                        <CardActions sx={{display:'flex', width: '100%'}}> 
                            {props.menuState[task.id] ? (
                                <CloseIcon sx={{fontSize: 16, cursor: 'pointer', color: 'red'}} onClick={() => props.handleMenuCard(task.id)}/>
                            ) : (
                                <MenuIcon sx={{fontSize: 16, border: 'none', cursor: 'pointer', transition: 'box-shadow 0.3s ease', ':hover':{boxShadow:'-3px 2px 2px -3px rgba(0, 0, 0, 0.5)'}}} onClick={() => props.handleMenuCard(task.id)}/>
                            )}
                            {props.menuState[task.id] && (
                                <Box sx={{display:'flex', flexDirection:'row', alignItems:'flex-end', width:'100%', justifyContent:'flex-end'}}>
                                    <Tooltip title="Edit" arrow>
                                        <Typography onClick={() => props.handleEditClick(task.id)} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer', mr: 2, color:'#000' }}>
                                            <EditIcon  sx={{fontSize:15, color:'#20B2AA' }}/>
                                            Edit
                                        </Typography>
                                    </Tooltip>
                                    <Tooltip title="Delete" arrow>
                                        <Typography  onClick={() => DeleteTask(task.id)} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer', mr: 1, color: '#000' }}>
                                            <DeleteIcon sx={{fontSize:15, verticalAlign: 'middle', color: 'red'}}/>
                                            Delete
                                        </Typography>
                                    </Tooltip>
                                </Box>
                            )}
                        </CardActions>
                    </Card>
                )
            )}
        </Box>
    )
}