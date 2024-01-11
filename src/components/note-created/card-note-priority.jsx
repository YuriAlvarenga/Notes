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
import TextField from '@mui/material/TextField'
import DoneIcon from '@mui/icons-material/Done'
import api from '../../services/api'

export default function CardNotePriority(props){ //recebe menuState e handleMenuCard de note-created.jsx

    const { task, DeleteTask } = useContext(NoteContext)

    //update nota
    const [ editingTaskId, setEditingTaskId ] = useState(null)
    const [editedTitle, setEditedTitle] = useState('')
    const [editedTask, setEditedTask] = useState('')
    const editedPriority = false

    const handleEditClick = (taskId) =>{
        setEditingTaskId(taskId)
    }
    const handleCancelUpdate = () => {
        setEditingTaskId(null)
        setEditedTitle('')
        setEditedTask('')
    }
    const UpdateTask = async (taskId) => {
        try {
            await api.put(`/task/${taskId}`, {
                title: editedTitle,
                task: editedTask,
                priority: editedPriority
            })
            // Limpa o estado de edição
            setEditingTaskId(null)
            setEditedTitle('')
            setEditedTask('')

        } catch (error) {
            if (error.response) {
                // O servidor respondeu com um código de status diferente de 2xx
                console.error('Detalhes da resposta:', error.response.data)
                console.error('Código de status HTTP:', error.response.status)
            }
        }
    }

    return(
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            {task.filter(task => task.priority).map(task =>(
                <Card key={task.id} sx={{ width: 200, height: 174, display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', mr: 4, backgroundColor: task.priority ? '#F4998D' : 'inherit', color: task.priority ? '#FFF' : '#000'}}>
                    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                        {editingTaskId === task.id ? (
                            <TextField 
                                placeholder='Edit the title here'
                                required
                                autoFocus
                                id="editedTitle"
                                name="editedTitle"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                InputProps={{
                                style:{ fontSize: 12, color:'#FFF' } 
                                }}
                                InputLabelProps={{
                                style: {
                                    fontSize: 12,
                                },
                                }}
                                sx={{background: '#F4998D',  '& fieldset': { border:'none'}}}
                            />
                            ) : (
                            <Typography sx={{ fontSize: 14, display:'flex', justifyContent:'center', width: '100%', m:1 }}>{task.title} </Typography>
                        )}
                        <Divider sx={{backgroundColor: task.priority ? '#FFF' : '#000', width: '100%', mt:0}}/>
                    </Box>
                    {editingTaskId === task.id ? (
                        <TextField
                            placeholder="Text your update note here"
                            wrap= 'soft'
                            multiline
                            maxRows={4}
                            required
                            fullWidth
                            id="editedTask"
                            name="editedTask"
                            autoComplete="editedTask"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                            sx={{background: '#F4998D',  '& fieldset': {border: 'none'}}}
                            InputProps={{
                            style: { fontSize: 12, color:'#FFF' },
                            }}
                            InputLabelProps={{
                            style: {
                                fontSize: 12, 
                            },
                            }}
                        />
                    ) : (
                        <Typography sx={{ display: 'flex', textAlign:'justify', m: 2, '& fieldset': { border: 'none' }, fontSize: 12}}>{task.task}</Typography>
                    ) }
                    <CardActions sx={{display:'flex', width: '100%'}}> 
                    {editingTaskId === task.id ? (
                        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-around'}}>
                            <Typography onClick={() => UpdateTask(task.id)}  sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}>
                                <DoneIcon  sx={{fontSize:16, color:'#FFF', cursor: 'pointer'}}/>
                                Salvar
                            </Typography>
                            <Typography onClick={() => handleCancelUpdate(task.id)} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}>
                                <DeleteIcon sx={{fontSize:16, color:'red'}}/>
                                Cancel
                            </Typography>
                        </Box>
                        ) : (
                        <>
                            {props.menuState[task.id] ? (
                                <CloseIcon sx={{fontSize: 16, cursor: 'pointer'}} onClick={() => props.handleMenuCard(task.id)}/>
                            ) : (
                                <MenuIcon sx={{fontSize: 16, cursor: 'pointer'}} onClick={() => props.handleMenuCard(task.id)}/>
                            )}
                            {props.menuState[task.id] && (
                                <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-around'}}>
                                    <Typography  sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}>
                                        <InfoIcon sx={{fontSize:16, color:'#4169E1'}}/>
                                    </Typography>
                                    <Typography  sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}>
                                        <EditIcon onClick={() => handleEditClick(task.id)} sx={{fontSize:16, color:'#20B2AA'}}/>
                                    </Typography>
                                    <Typography  sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}>
                                        <DeleteIcon onClick={() => DeleteTask(task.id)} sx={{fontSize:16, color:'red'}}/>
                                    </Typography>
                                </Box>
                            )}
                        </>
                    )}

                    </CardActions>
                </Card>
            ))}
        </Box>
    )
}