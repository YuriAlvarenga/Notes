
import { Box, List, Divider,} from "@mui/material"
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'


export default function Sidebar(){
    return(
        <Box sx={{ overflow: 'auto' }}>
        <List>
            {['Minhas notas', 'Notas compartilhadas', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
            <ListItemButton>
                
                <ListItemText primary={text} />
            </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
            <ListItemButton>
            
                <ListItemText primary={text} />
            </ListItemButton>
            </ListItem>
        ))}
        </List>
        </Box>
    )    
}
