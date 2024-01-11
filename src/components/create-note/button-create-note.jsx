import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'


export default function ButtonCreateNote(props){ //props handleOpenCard vindo de home
    return(
        <CardActions sx={{display:'flex', justifyContent:'center'}}> 
            <Button variant="contained" size="small" endIcon={<AddIcon/>} sx={{fontSize: 12, width: 200, background: '#101F33'}} onClick={props.handleOpenCard}>Create Note</Button>
        </CardActions>
   )
}
