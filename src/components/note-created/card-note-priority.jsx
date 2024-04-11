import React, { useState, useContext } from "react"
import { FaUserFriends } from 'react-icons/fa'
import Typography from '@mui/material/Typography'
import { Box, Button } from "@mui/material"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Tooltip from '@mui/material/Tooltip'
import { NoteContext } from "../../context/notesContext"
import UpdateNote from "./card-updated"
import CardShared from "../notes-shared/users-shared-card"
import { Colors } from "../../colors"
import ShareIcon from '@mui/icons-material/Share'
import CardShare from "../notes-shared/share-card"
import { SharedContext } from "../../context/sharedContext"


export default function CardNotePriority({menuState, handleMenuCard, handleEditClick}){ //recebe menuState, handleMenuCard e handleEditClick de note-created.jsx  

    const { task, DeleteTask, editingTaskId } = useContext(NoteContext)
    const { sharedUsersNotes } = useContext(SharedContext)

    const [showShared, setShowShared] = useState(null)
    const [showShareMenu, setShowShareMenu] = useState(null)

    //abre lista de usuários com quem a nota foi compartilhada
    const toggleShared = (taskId) => {
        setShowShared(taskId)
    }

    //abre campo pág com input para compartilhar a nota/buscar usuário
    const handleShareClick = (taskId) => {
        setShowShareMenu(taskId)
    }


    const colorCard = Colors.cardPriority

    return (
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', flexWrap: 'wrap', fontFamily: 'cursive'}}>
            {task.filter(taskItem => taskItem.priority).map(taskItem => (
                <React.Fragment key={taskItem.id}>
                    {editingTaskId === taskItem.id ? (
                        <UpdateNote taskId={taskItem.id} handleMenuCard={handleMenuCard} />
                    ) : (
                        <React.Fragment>
                            {showShared === taskItem.id  ? (
                                <CardShared taskId={taskItem.id}  toggleShared={toggleShared} handleMenuCard={handleMenuCard} colorCard={colorCard} />
                                ) : (
                                    <React.Fragment>
                                        {showShareMenu === taskItem.id ? (
                                            <CardShare taskId={taskItem.id} toggleShared={toggleShared} handleShareClick={handleShareClick} colorCard={colorCard}/>
                                        ) : (
                                            <Card key={taskItem.id} sx={{ position: 'relative', width: 200, height: 174, m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: taskItem.priority ? Colors.cardPriority : 'inherit', color: taskItem.priority ? Colors.secondary : '#000' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Typography sx={{ fontSize: 14, fontFamily: 'cursive', display: 'flex', justifyContent: 'center', width: '100%', mt: 1, mb: 0.5 }}>{taskItem.title}</Typography>
                                                    <Box sx={{width: '85%',display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'justify',
                                                            ml: 2, mt: 1, overflowX: 'none', scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch', fontSize: 12, wordWrap: 'break-word',overflowY: 'auto', maxHeight: '15vh'
                                                        }}
                                                        ref={(box) => {
                                                            if (box) {
                                                                box.style.overflowY = box.scrollHeight > box.clientHeight ? 'scroll' : 'hidden'
                                                            }
                                                        }}
                                                    >
                                                        {taskItem.task}
                                                    </Box>
                                                </Box>
    
                                                <CardActions sx={{ display: 'flex', width: '100%' }}>
                                                    {menuState[taskItem.id] ? (
                                                        <ArrowBackIcon sx={{ position: 'absolute', top: 5, left: 5, fontSize: 16, color: Colors.secondary, cursor: 'pointer' }} onClick={() => handleMenuCard(taskItem.id)} />
                                                    ) : (
                                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                                            <Tooltip title="Menu From Card" arrow>
                                                                <MenuIcon sx={{ fontSize: 16, border: 'none', cursor: 'pointer', transition: 'box-shadow 0.3s ease', ':hover': { boxShadow: '-3px 2px 2px -3px rgba(0, 0, 0, 0.5)' } }} onClick={() => handleMenuCard(taskItem.id)} />
                                                            </Tooltip>
                                                            {sharedUsersNotes.some(note => note.note_id === taskItem.id) && (
                                                                <FaUserFriends onClick={() => toggleShared(taskItem.id)} style={{ cursor: 'pointer' }} />
                                                            )}
                                                        </Box>
                                                    )}
                                                    {menuState[taskItem.id] && (
                                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around' }}>
                                                            <Tooltip title="share" arrow>
                                                                <Button onClick={() => handleShareClick(taskItem.id)} sx={{ textTransform: 'capitalize', fontFamily: 'cursive', fontSize: 10, display: 'flex', alignItems: 'center', cursor: 'pointer', color: Colors.secondary }}>
                                                                    <ShareIcon sx={{ fontSize: 12, color: Colors.primary, mr:0.2 }} />
                                                                    Share
                                                                </Button>
                                                            </Tooltip>
                                                            <Tooltip title="Edit" arrow>
                                                                <Button onClick={() => handleEditClick(taskItem.id)} sx={{ textTransform: 'capitalize', fontFamily: 'cursive', fontSize: 10, display: 'flex', alignItems: 'center', cursor: 'pointer', color: Colors.secondary }}>
                                                                    <EditIcon sx={{ fontSize: 12, color: Colors.success, mr:0.2 }} />
                                                                    Edit
                                                                </Button>
                                                            </Tooltip>
                                                            <Tooltip title="Delete" arrow>
                                                                <Button onClick={() => DeleteTask(taskItem.id)} sx={{ textTransform: 'capitalize', fontFamily: 'cursive', fontSize: 10, display: 'flex', alignItems: 'center', cursor: 'pointer', color: Colors.secondary}}>
                                                                    <DeleteIcon sx={{ fontSize: 12, color: Colors.danger, mr:0.2 }} />
                                                                    Delete
                                                                </Button>
                                                            </Tooltip>
                                                        </Box>
                                                    )}
                                                </CardActions>
                                            </Card>
                                        )}
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ))}
            </Box>
        )
    }