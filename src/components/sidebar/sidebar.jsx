
import { Box, List, Divider,} from "@mui/material"
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'


export default function Sidebar(){
    return(
        <Box sx={{ overflow: 'auto' }}>
        <List>
            {['Minhas notas', 'Notas compartilhadas'].map((text, index) => (
            <ListItem key={text} disablePadding >
                <ListItemButton autoFocus={index === 0}>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
        {['Settings', 'Something', 'Logout'].map((text, index) => (
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
