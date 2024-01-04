import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'


export default function ButtonCreateNote(props){
    return(
        <CardActions sx={{display:'flex', justifyContent:'center'}}> 
            <Button variant="contained" size="small" endIcon={<AddIcon/>} sx={{fontSize: 12, width: 200}} onClick={props.handleOpenCard}>Criar Nota</Button>
        </CardActions>
   )
}
