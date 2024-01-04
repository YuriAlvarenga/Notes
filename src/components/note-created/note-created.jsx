import React, { useState, useEffect } from "react"
import axios from 'axios'

import Typography from '@mui/material/Typography'
import { Box, Divider } from "@mui/material"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'





export default function NoteCreated(){
    
    // requisição para o backend - ficará aqui apenas temporariamente para testes
   
    const [ task, setTask ] = useState([])
    useEffect(()=>{
      const Tasks = async () => {
        try{
          const response = await axios.get('http://localhost:8000/task')
          setTask(response.data)
        }catch{
          console.error("error ao buscar tarefas.")
        }
      }
      Tasks()
    },[])

    // abre menu dentro de card notas

    const [ menuCard, setMenuCard ] = useState(false)

    const handleMenuCard = () => {
      setMenuCard(!menuCard)
    }

    
    return(
        <Box sx={{display:'flex', flexDirection:'column', width: '100%', mt: 4}}>
            {task.length > 0 ? (
                <Box>
                    <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        {task.filter(task => task.priority).map(task =>(
                            <Card key={task.id} sx={{ width: 200, height: 174, display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', mr: 4, backgroundColor: task.priority ? '#F4998D' : 'inherit', color: task.priority ? '#FFF' : '#000'}}>
                                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                    <Typography sx={{ fontSize: 14, display:'flex', justifyContent:'center', width: '100%', m:1 }}>{task.title} </Typography>
                                    <Divider sx={{backgroundColor: task.priority ? '#FFF' : '#000', width: '100%', mt:0}}/>
                                </Box>
                                <Typography sx={{ display: 'flex', textAlign:'justify', m: 2, '& fieldset': { border: 'none' }, fontSize: 12,}}>{task.task}</Typography>
                                <CardActions sx={{display:'flex', width: '100%'}}> 
                                    {menuCard ? (<CloseIcon sx={{fontSize: 16, cursor: 'pointer'}} onClick={handleMenuCard}/>) : (<MenuIcon sx={{fontSize: 16, cursor: 'pointer'}} onClick={handleMenuCard}/> )}
                                        {menuCard && (
                                        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-around'}}>
                                            <Typography onClick={handleMenuCard} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}><InfoIcon sx={{fontSize:16, color:'#4169E1'}}/></Typography>
                                            <Typography onClick={handleMenuCard} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}><EditIcon sx={{fontSize:16, color:'#20B2AA'}}/></Typography>
                                            <Typography onClick={handleMenuCard} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}><DeleteIcon sx={{fontSize:16, color:'red'}}/></Typography>
                                        </Box>
                                        )}
                                </CardActions>
                            </Card>
                        ))}
                    </Box>

                    {task.some(task => task.priority) && (
                        <Divider sx={{ m: 4 }} />
                    )}

                    <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', mt: 4}}>
                        {task.filter(task => !task.priority).map(task =>(
                            <Card key={task.id} sx={{ width: 200, height: 174, display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', mr: 4, backgroundColor: '#ADD8E6'}}>
                                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                    <Typography sx={{ fontSize: 14, display:'flex', justifyContent:'center', width: '100%', m:1 }}>{task.title} </Typography>
                                    <Divider sx={{backgroundColor: task.priority ? '#FFF' : '#000', width: '100%'}}/>
                                </Box>
                                <Typography sx={{display: 'flex', textAlign:'justify', m: 2, '& fieldset': { border: 'none' }, fontSize: 12,}}>{task.task}</Typography>
                                <CardActions sx={{display:'flex', width: '100%'}}>
                                    {menuCard ? (<CloseIcon sx={{fontSize: 16, cursor: 'pointer'}} onClick={handleMenuCard}/>) : (<MenuIcon sx={{fontSize: 16, cursor: 'pointer'}} onClick={handleMenuCard}/> )}
                                        {menuCard && (
                                        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-around'}}>
                                            <Typography onClick={handleCloseCard} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}><InfoIcon sx={{fontSize:16, color:'#4169E1'}}/></Typography>
                                            <Typography onClick={handleCloseCard} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}><EditIcon sx={{fontSize:16, color:'#20B2AA'}}/></Typography>
                                            <Typography onClick={handleCloseCard} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}><DeleteIcon sx={{fontSize:16, color:'red'}}/></Typography>
                                        </Box>
                                        )}
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </Box>
                ):(
                <Box>
                    <Typography>A lista está vazia</Typography>
                </Box>
            )}  
        </Box>

    )  
}


