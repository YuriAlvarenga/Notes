import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { Box, Input, Checkbox } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

export default function CreateNote(props){
    return(
        <Card sx={{ width: 200, display: 'flex', flexDirection:'column'}}>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              <Input sx={{ fontSize: 14, display:'flex', justifyContent:'center', width: '80%' }} placeholder="Título"/>
            </Box>
            <TextField
              label="Digite seu texto"
              wrap= 'soft'
              InputProps={{
                style: { fontSize: 12 },
              }}
              InputLabelProps={{
                style: {
                  fontSize: 12, 
                },
              }}
              sx={{background: '#FFF', m: 1, '& fieldset': { border: 'none' }}}
              multiline
              maxRows={4}
            />
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
              <FormControlLabel
                control={
                  <Checkbox size="small"/>
                }
                label={
                  <Typography sx={{ fontSize: 10 }}>prioridade</Typography>
                }
              />
              <Typography onClick={props.handleCloseCard} sx={{ fontSize: 10, display:'flex', alignItems:'center', cursor:'pointer' }}><DeleteIcon sx={{fontSize:16, color:'red'}}/>Cancelar</Typography>
            </Box>
            <CardActions sx={{display:'flex', justifyContent:'center'}}> 
              <Button variant="contained" size="small" endIcon={<AddIcon/>} sx={{fontSize: 12}}>Criar Nota</Button>
            </CardActions>
          </Card>
    )
}