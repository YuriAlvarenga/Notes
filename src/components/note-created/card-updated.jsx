import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { Box,  Checkbox, Divider } from "@mui/material"
import { useContext, useState } from 'react'
import { NoteContext } from '../../context/notesContext'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'


export default function UpdateNote(props){ //props setEditingTaskId e handleMenuCard vindo de cards priority e no priority

  
    const { task, UpdateTask,  editedTitle, setEditedTitle, editedTask, setEditedTask, editedPriority, setEditPriority, setEditingTaskId } = useContext(NoteContext)
    const [editedTitleError, setEditedTitleError] = useState('')
    const [editedNoteError, setEditedNoteError] = useState('')
   

    const handleCancelUpdate = () => {
        setEditingTaskId('')
        setEditedTitle('')
        setEditedTask('')
        setEditedTitleError('')
        setEditedNoteError('')
        setEditPriority(false)
        props.handleMenuCard(props.taskId)
    }
    const frontEndValidationUpdate = () => {
        
        if(editedTitle.trim() === ''){
            setEditedTitleError('Title is required')
            return false
        }else if(editedTitle.length < 4){
            setEditedTitleError('Title is too short')
            return false
        }else if(editedTitle.length > 20){
            setEditedTitleError('Title is too long')
            return false
        }
        if(editedTask.trim() === ''){
            setEditedNoteError('Description is required')
            return false
        }else if(editedTask.length < 5){
            setEditedNoteError('Description is too short')
            return false
        }
        return true
    }
    const handleSaveClick = () => { 
       
        const isValid = frontEndValidationUpdate()
        if(isValid) {
            UpdateTask(props.taskId, editedTitle, editedTask, editedPriority )
    
            // Limpa o estado de edição
            setEditingTaskId('')
            setEditedTitle('')
            setEditedTask('')
            setEditPriority(false)
            props.handleMenuCard(props.taskId)
        }
    }

  return(
    
    <Card sx={{ width: 200, display: 'flex', flexDirection:'column', background: '#ffc26c', justifyContent:'space-between'}}>
        <TextField 
            placeholder='Edit the title here'
            required
            autoFocus
            id="editedTitle"
            name="editedTitle"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            sx={{'& fieldset': { border:'none'}}}
            InputProps={{
            style:{ fontSize: 12, } 
            }}
            InputLabelProps={{
            style: {
                fontSize: 12,
            },
            }}
            error={!!editedTitleError}
            helperText={editedTitleError}
        />

      <Divider sx={{ width:"80%", ml: 2, mt: 0, pt:0, mb: 1 }} />

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
            sx={{ '& fieldset': {border: 'none'}}}
            InputProps={{
            style: { fontSize: 12, },
            }}
            InputLabelProps={{
            style: {
                fontSize: 12, 
            },
            }}
            error={!!editedNoteError}
            helperText={editedNoteError}
        />
      <Box sx={{display:'flex', alignItems:'flex-start', ml:2}}>
        <FormControlLabel
          onChange={(e) => setEditPriority(e.target.checked)}
          control={
            <Checkbox size="small" checked={editedPriority}/>
          }
          label={
            <Typography sx={{ fontSize: 10 }}>priority</Typography>
          }
        />
      </Box>
      <CardActions sx={{display:'flex', justifyContent:'center'}}> 
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-around'}}>
            <Typography onClick={() => handleSaveClick(task.id)}  sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}>
                <DoneIcon  sx={{fontSize:16, color:'#20B2AA', cursor: 'pointer'}}/>
                Salvar
            </Typography>
            <Typography onClick={() => handleCancelUpdate(task.id)} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}>
                <CloseIcon sx={{fontSize:16, color:'red'}}/>
                Cancel
            </Typography>
        </Box>
      </CardActions>
    </Card>
  ) 
}