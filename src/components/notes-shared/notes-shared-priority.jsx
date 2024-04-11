import React, { useState, useContext } from "react"
import Typography from '@mui/material/Typography'
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import Tooltip from '@mui/material/Tooltip'
import { Colors } from "../../colors"
import { SharedContext } from "../../context/sharedContext"


export default function CardNoteSharedPriority() { //recebe menuState, handleMenuCard e handleEditClick de note-created.jsx  

    const { sharedNotes, DeleteSharedNote } = useContext(SharedContext)

    // abre menu dentro de card notas compartilhadas
    const [menuState, setMenuState] = useState({})
    const handleMenuCard = (taskId) => {
        setMenuState(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }))
    }

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box sx={{fontFamily: 'cursive',  display: 'flex', flexDirection:'column', alignItems: isMobile ? 'center' : 'start', justifyContent:isMobile ? 'center' : 'start', width:'100%', m: isMobile ? 0 : 4}}>
            {sharedNotes.length > 0 ? (
                <React.Fragment>
                    {sharedNotes.filter( noteShared => noteShared.note.priority).map(noteShared => 
                        <Card key={`priority-${noteShared.note.id}`}sx={{ position: 'relative', width: 200, height: 174, m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: noteShared.note.priority ? Colors.cardPriority : 'inherit', color: Colors.secondary }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: 14, fontFamily: 'cursive', display: 'flex', justifyContent: 'center', width: '100%', mt: 1, mb: 0.5 }}>{noteShared.note.title}</Typography>
                                <Box sx={{
                                    width: '85%', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'justify',
                                    ml: 2, mt: 1, overflowX: 'none', scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch', fontSize: 12, wordWrap: 'break-word', overflowY: 'auto', maxHeight: '15vh'
                                }}
                                    ref={(box) => {
                                        if (box) {
                                            box.style.overflowY = box.scrollHeight > box.clientHeight ? 'scroll' : 'hidden'
                                        }
                                    }}
                                >
                                    {noteShared.note.task}
                                </Box>
                            </Box>
        
                            <CardActions sx={{ display: 'flex', width: '100%' }}>
        
                                <Box sx={{ width: '10%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Tooltip title="info" arrow>
                                        <InfoIcon onClick={()=>handleMenuCard(noteShared.note.id)} sx={{ fontSize: 16, border: 'none', cursor: 'pointer', color:Colors.info, transition: 'box-shadow 0.3s ease', ':hover': { boxShadow: '-3px 2px 2px -3px rgba(0, 0, 0, 0.5)' } }} />
                                    </Tooltip>
                                </Box>
        
                                {menuState[noteShared.note.id] && (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-around' }}>                  
                                        <Typography sx={{fontSize:10, fontFamily: 'cursive'}}>Shared by @{noteShared.note.own_user.name}</Typography>
                                        
                                        <Tooltip title="Delete" arrow>
                                            <DeleteIcon onClick={() => DeleteSharedNote(noteShared.current_user, noteShared.note.id)} sx={{ fontSize: 12, color: Colors.danger, cursor:'pointer'}} />
                                        </Tooltip>
                                    </Box>
                                )}
        
                            </CardActions>
                        </Card>
                    )}
                    {sharedNotes.some(noteShared => noteShared.note.priority) && (
                        <Divider sx={{ width:'95%'}} />
                    )}
                    {sharedNotes.filter( noteShared => !noteShared.note.priority).map(noteShared => 
                        <Card key={`no-priority-${noteShared.note.id}`} sx={{ position: 'relative', width: 200, height: 174, m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: !noteShared.note.priority ? Colors.cardNoPriority : 'inherit', color: Colors.secondary }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: 14, fontFamily: 'cursive', display: 'flex', justifyContent: 'center', width: '100%', mt: 1, mb: 0.5 }}>{noteShared.note.title}</Typography>
                                <Box sx={{
                                    width: '85%', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'justify',
                                    ml: 2, mt: 1, overflowX: 'none', scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch', fontSize: 12, wordWrap: 'break-word', overflowY: 'auto', maxHeight: '15vh'
                                }}
                                    ref={(box) => {
                                        if (box) {
                                            box.style.overflowY = box.scrollHeight > box.clientHeight ? 'scroll' : 'hidden'
                                        }
                                    }}
                                >
                                    {noteShared.note.task}
                                </Box>
                            </Box>
        
                            <CardActions sx={{ display: 'flex', width: '100%' }}>
        
                                <Box sx={{ width: '10%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Tooltip title="info" arrow>
                                        <InfoIcon onClick={()=>handleMenuCard(noteShared.note.id)} sx={{ fontSize: 16, border: 'none', cursor: 'pointer', color:Colors.info, transition: 'box-shadow 0.3s ease', ':hover': { boxShadow: '-3px 2px 2px -3px rgba(0, 0, 0, 0.5)' } }} />
                                    </Tooltip>
                                </Box>
        
                                {menuState[noteShared.note.id] && (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-around' }}>                  
                                        <Typography sx={{fontSize:10, fontFamily: 'cursive'}}>Shared by @{noteShared.note.own_user.name}</Typography>
                                        
                                        <Tooltip title="Delete" arrow>
                                            <DeleteIcon onClick={() => DeleteSharedNote(noteShared.current_user, noteShared.note.id)}  sx={{ fontSize: 12, color: Colors.danger, cursor:'pointer'}} />
                                        </Tooltip>
                                    </Box>
                                )}
        
                            </CardActions>
                        </Card>
                    )}

                </React.Fragment>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Typography>Nothing to see</Typography>
                </Box>
            )}

        </Box>
    )
}