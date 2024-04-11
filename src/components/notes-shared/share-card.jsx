import React, { useContext, useState } from "react"
import Typography from '@mui/material/Typography'
import { Box, Button, CardActions } from "@mui/material"
import Card from '@mui/material/Card'
import CloseIcon from '@mui/icons-material/Close'
import { Colors } from "../../colors"
import TextField from '@mui/material/TextField'
import ShareIcon from '@mui/icons-material/Share'
import Tooltip from '@mui/material/Tooltip'
import { SharedContext } from "../../context/sharedContext"
import { NoteContext } from "../../context/notesContext"
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'


export default function CardShare({ handleShareClick,taskId, colorCard}){ 

    const { task } = useContext(NoteContext)
    const { sharedNotes, ShareNote } = useContext(SharedContext)

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    

    //cancela e volta a página para o menu principal em notes
    const handleCancelShare = () => {
        setEmail('')
        setEmailError('')
    }
    
    const handleCloseShare = (taskId) => {
        handleShareClick(taskId)
    }
    //faz a validação do campo de input de compartilhamento e é chamado na função handlesubmit
    const userValidation = () =>{
        if(email.trim() === ''){
            setEmailError('Email é obrigatório')
            return false
        } else if(!emailRegex.test(email)){
            setEmailError('Email inválido')
            return false
        }
        setEmailError('')
        return true
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        if(userValidation()){
            try{
                const result = await ShareNote(email, taskId)
                if (result.success) {
                    setSuccessMessage(result.message)
                    setTimeout(()=>{
                        setSuccessMessage('')
                    },2000)
                    setEmail('')
                    setEmailError('')
  
                } else {
                    setEmailError(result.message)
                }
            }catch(error){
                console.log(error)
            }
        }
    }

    const sharedNote = sharedNotes.find(note => note && note.note_id === taskId)


    return(
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'center', flexWrap: 'wrap'}}>
            <Card sx={{position:'relative', width: 200, height: 174, m:1, display: 'flex', flexDirection:'column', justifyContent:'space-between', backgroundColor: colorCard, color: Colors.secondary}}>
                <ArrowBackIcon sx={{ position: 'absolute', top: 3, left: 3, fontSize: 16, color: Colors.secondary, cursor: 'pointer' }} onClick={handleCloseShare} />
                <Box component="form" noValidate  sx={{display:'flex', flexDirection:'column'}}>
                    <Box sx={{ m: 1, mt:3, fontSize:10 }}>
                        <TextField
                            margin="none"
                            required
                            fullWidth
                            id="email"
                            label= 'Share with'
                            name="email"
                            autoComplete="email"
                            autoFocus
                            size="small"
                            InputProps={{
                                style: {
                                    color: Colors.secondary,
                                    fontFamily: 'cursive',
                                    fontSize:"14px"
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: emailError || (sharedNote && sharedNote.emailNotFound) ? Colors.danger : Colors.secondary,
                                    fontSize: '12px',
                                    fontFamily: 'cursive'
                                }
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!(emailError || (sharedNote && sharedNote.emailNotFound))}
                            helperText={emailError || (sharedNote && sharedNote.emailNotFound)}
                        />
                    </Box>
                    <CardActions sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}> 
                        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-around'}}>
                            <Tooltip title="share" arrow>
                                <Button type="submit" onClick={handleSubmit} sx={{ textTransform: 'capitalize', fontFamily: 'cursive', fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}>
                                    <ShareIcon sx={{fontSize:14, color:Colors.primary}}/>
                                    Share
                                </Button>
                            </Tooltip>
                            <Tooltip title="cancel" arrow>
                                <Button onClick={() => handleCancelShare(task.id)} sx={{ textTransform: 'capitalize',fontFamily: 'cursive', fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}>
                                    <CloseIcon sx={{fontSize:14, color: Colors.danger, cursor:'pointer'}} />
                                    cancel
                                </Button>
                            </Tooltip>
                        </Box>
                        {successMessage  && (
                            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', background: '#D5FFE2', width: '90%', justifyContent:'space-around', p:0.5, borderRadius:1 }}>
                                <TaskAltIcon sx={{ color: Colors.success, fontSize:16 }} />
                                <Typography sx={{ fontSize: 10, color: '#000'}} >
                                    {successMessage}
                                </Typography>
                            </Box>
                        )}
                            
                    </CardActions>
                </Box>
            </Card>
        </Box>
    )
}
