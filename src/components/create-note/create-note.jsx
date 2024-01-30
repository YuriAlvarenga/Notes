import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { Box,  Checkbox, Divider } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { useContext, useState } from 'react'
import { NoteContext } from '../../context/notesContext'

export default function CreateNote(props){ //props handleCloseCard vindo de home

  const [ title, setTitle ] = useState('')
  const [ task, setTask ] = useState('')
  const [ priority, setPriority ] = useState(false)

  const [titleError, setTitleError] = useState('')
  const [noteError, setNoteError] = useState('')
  

  const { CreateTask } = useContext(NoteContext)

  const frontendValidationNote = () => {
    if (title.trim() === '') {
      setTitleError('Title is required')
      return false
    } else if (title.length < 4) {
      setTitleError('Title too short')
      return false
    } else if (title.length > 20) {
      setTitleError('Title too long')
      return false
    }

    if (task.trim() === ''){
      setNoteError('Description is required')
      return false
    }else if(task.length < 5){
      setNoteError('Description is too short')
      return false
    }

    return true 
  }
  
  const handleCreateNote = (event) => {
    event.preventDefault()
    const isValid = frontendValidationNote()
  
    if (isValid) {
      CreateTask(title, task, priority)
      // Limpe os erros após a criação bem-sucedida 
      setTitle('')
      setTask('')
      setPriority(false)
      setTitleError('')
      setNoteError('')
    }
  }

  return(
    <Card sx={{ width: 200, display: 'flex', flexDirection:'column', backgroundColor: priority ? '#F4998D' : '#ADD8E6', color: priority ? '#FFF' : '#FFF'}}>
      <TextField 
        placeholder='Title'
        required
        autoFocus
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        InputProps={{
          style:{ fontSize: 12, color:'#FFF' } 
        }}
        InputLabelProps={{
          style: {
            fontSize: 12,
          }
        }}
        sx={{'& fieldset': { border:'none'}}}
        error={!!titleError}
        helperText={titleError}
      />

      <Divider sx={{ width:"80%", ml: 2, mt: 0, pt:0, mb: 1 }} />

      <TextField
        placeholder="Text here"
        wrap= 'soft'
        multiline
        maxRows={4}
        required
        fullWidth
        id="task"
        name="task"
        autoComplete="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        sx={{'& fieldset': {border: 'none'}}}
        InputProps={{
          style: { fontSize: 12, color:'#FFF'  },
        }}
        InputLabelProps={{
          style: {
            fontSize: 12, 
          }
        }}
        error={!!noteError}
        helperText={noteError}

      />
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
        <FormControlLabel
          onChange={(e) => setPriority(e.target.checked)}
          control={
            <Checkbox size="small" checked={priority}/>
          }
          label={
            <Typography sx={{ fontSize: 10 }}>priority</Typography>
          }
        />
        <Typography  onClick={props.handleCloseCard} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}><CloseIcon sx={{fontSize:16, color:'red'}}/>Cancel</Typography>
      </Box>
      <CardActions sx={{display:'flex', justifyContent:'center'}}> 
        <Button onClick={handleCreateNote} variant="contained" size="small" endIcon={<AddIcon/>} sx={{fontSize: 9, width: '100%'}}>Create Note</Button>
      </CardActions>
    </Card>
  )
}