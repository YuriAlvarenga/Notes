import React, { useContext, useState, useEffect } from "react"
import Typography from '@mui/material/Typography'
import { Box, Button } from "@mui/material"
import Card from '@mui/material/Card'
import CloseIcon from '@mui/icons-material/Close'
import { Colors } from "../../colors"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import DeleteIcon from '@mui/icons-material/Delete'
import { SharedContext } from "../../context/sharedContext"
import Tooltip from '@mui/material/Tooltip'


export default function CardShared({ toggleShared, colorCard, handleMenuCard, taskId }) {

    const { sharedUsersNotes, DeleteSharedNote } = useContext(SharedContext)

    const currentSharedUsers = sharedUsersNotes.filter(item => item.note_id === taskId)

    const handleClosePagOfShareds = (taskId) => {
        toggleShared(taskId)
        handleMenuCard(taskId)
    }

    // Implementação de paginação
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const totalPages = Math.ceil(currentSharedUsers.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, currentSharedUsers.length)

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', fontFamily: 'cursive' }}>
            <Card key={taskId} sx={{ width: 200, height: 174, m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: colorCard, color: Colors.secondary }}>
                <CloseIcon sx={{ position: 'absolute', top: 12, right: 12, fontSize: 14, color: Colors.danger, cursor: 'pointer' }} onClick={handleClosePagOfShareds} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: 14, display: 'flex', justifyContent: 'center', width: '100%', mt: 1, mb: 0.5 }}>Shared with</Typography>
                    <Box
                        sx={{
                            width: '85%', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'justify', ml: 2, mt: 1,
                            overflowX: 'none', WebkitOverflowScrolling: 'touch', wordWrap: 'break-word', overflowY: 'none', maxHeight: '15vh'
                        }}
                    >
                        <React.Fragment>
                            {currentSharedUsers.slice(startIndex, endIndex).map((sharedItem, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontSize: 12, fontFamily: 'cursive' }} >@{sharedItem.name}</Typography>
                                    <Tooltip title="Delete" arrow>
                                        <Button onClick={() => DeleteSharedNote(sharedItem.id, sharedItem.note_id)} sx={{ fontFamily: 'cursive', fontSize: 10, display: 'flex', justifyContent: 'flex-end', cursor: 'pointer', color: Colors.secondary }}>
                                            <DeleteIcon sx={{ fontSize: 12, color: Colors.danger }} />
                                        </Button>
                                    </Tooltip>
                                </Box>
                            ))}
                            {totalPages < 1 &&
                                <Typography sx={{ fontFamily: 'cursive', fontSize: 12, mt: 1, ml: 'auto', mr: 'auto' }}>This note is no longer being shared</Typography>
                            }
                        </React.Fragment>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', mb: 1 }}>
                    <React.Fragment>
                        <Box sx={{ display: currentPage === 1 ? 'none' : 'block' }}>
                            <Button sx={{ minWidth: '15px', height: '15px', fontSize: '12px', mb: 1, backgroundColor: 'transparent', color: Colors.secondary }} onClick={prevPage} disabled={currentPage === 1}>
                                <KeyboardArrowLeftIcon />
                            </Button>
                        </Box>
                        <Box>
                            {totalPages >= 1 ? (
                                <Button sx={{ minWidth: '15px', height: '15px', fontSize: '12px', fontFamily: 'cursive', mb: 1, backgroundColor: 'transparent', color: Colors.secondary }}>
                                    {currentPage} / {totalPages}
                                </Button>
                            ) : null}

                        </Box>
                        <Box sx={{ display: currentPage === 1 ? 'none' : 'block' }}>
                            <Button sx={{ minWidth: '15px', height: '15px', fontSize: '12px', mb: 1, backgroundColor: 'transparent', color: Colors.secondary }} onClick={nextPage} disabled={currentPage === totalPages}>
                                <KeyboardArrowRightIcon />
                            </Button>
                        </Box>
                    </React.Fragment>
                </Box>
            </Card>
        </Box>
    )
}
