import React, { useState, useContext } from 'react'
import { Box, Button, Typography, useMediaQuery, TextField } from '@mui/material'
import { SettingsContext } from '../../../context/settingsContext'



export default function GeneralSettings() {

    const { userProfile, UpdateUser, editedUser, editedPassword, setEditedUser, setEditedPassword } = useContext(SettingsContext)
    const isMobile = useMediaQuery('(max-width:600px)')
    const [readOnly, setReadOnly] = useState(true)

    //mudança em leitura e edição da página profile settings
    const toggleReadOnly = async () => {
        setReadOnly(true)

        const updatedUser = editedUser.trim() !== '' ? editedUser : userProfile.name
        const updatedPassword = editedPassword.trim() !== '' ? editedPassword : userProfile.password
    
        await UpdateUser(updatedUser, updatedPassword)
  
        setEditedUser("")
        setEditedPassword("")
    }
    const toggleEditProfile = () => {
        setReadOnly(false)
    }


    const handleUserChange = (event) => {
        setEditedUser(event.target.value)
    }
    
    const handlePasswordChange = (event) => {
        setEditedPassword(event.target.value)
    }


    return (
        <Box sx={{ width: isMobile ? '90%' : '70%' }}>
            {isMobile ? (
                <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <Button variant={readOnly ? 'outlined' : 'contained'} sx={{ fontSize: '0.5em' }} onClick={toggleEditProfile}>Edit</Button>
                        <Button variant={readOnly ? 'contained' : 'outlined'} sx={{ fontSize: '0.5em', mr: 1 }} onClick={toggleReadOnly}>Read only</Button>
                    </Box>
                    <Typography variant='h6' sx={{ textTransform: 'capitalize', fontFamily: 'cursive' }}>Profile</Typography>
                </Box>) : (
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h6' sx={{ textTransform: 'capitalize', fontFamily: 'cursive' }}>Profile</Typography>
                    <Box>
                        <Button variant={readOnly ? 'contained' : 'outlined'} sx={{ fontSize: '0.5em', mr: 1 }} onClick={toggleReadOnly}>Read only</Button>
                        <Button variant={readOnly ? 'outlined' : 'contained'} sx={{ fontSize: '0.5em' }} onClick={toggleEditProfile}>Edit</Button>
                    </Box>
                </Box>
            )}
            {readOnly ? (
                <Box sx={{ m: 2 }}>
                    <Box sx={{ display:'flex', fontFamily: 'cursive', fontSize: 14, m: 1}}>E-mail: <Typography sx={{ml:1, color:"text.secondary", fontSize: 13}}>{userProfile.email}</Typography></Box>
                    <Box sx={{ display:'flex', fontFamily: 'cursive', fontSize: 14, m: 1 }}>User: <Typography sx={{ml:1, color:"text.secondary", fontSize: 13}}>{userProfile.name}</Typography></Box>
                    <Box sx={{ display:'flex', fontFamily: 'cursive', fontSize: 14, m: 1 }}>Password: <Typography sx={{ml:1, color:"text.secondary", fontSize: 13}}>{userProfile.password.length > 8 ? '********' : userProfile.password.replace(/./g, '*')}</Typography></Box>
                </Box>
            ) : (
                <>
                    <Box sx={{ m: 2 }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: 14, m: 1 }}>E-mail: {userProfile.email}</Typography>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: 14, m: 1 }}>User:</Typography>
                        <TextField
                            label={userProfile.name}
                            value={editedUser}
                            variant="standard"
                            autoFocus
                            onChange={handleUserChange}
                            sx={{ fontFamily: 'cursive', fontSize: 12, m: 1 }}
                        />
                        <Typography sx={{ fontFamily: 'cursive', fontSize: 12, m: 1 }}>Password:</Typography>
                        <TextField
                            label={userProfile.password.length > 8 ? '********' : userProfile.password.replace(/./g, '*')}
                            type="password"
                            variant="standard"
                            value={editedPassword}
                            onChange={handlePasswordChange}
                            sx={{ fontFamily: 'cursive', fontSize: 12, m: 1 }}
                        />
                    </Box>
                    <Box sx={{width:'22%', m:2, display:'flex', flexDirection:'row-reverse'}}>
                        <Button variant="contained" onClick={toggleReadOnly} sx={{ fontSize: '0.5em', mb: 1 }}>Save</Button>
                    </Box>
                </>
            )}
            {/* <Typography variant='h6' sx={{ textTransform: 'capitalize', fontFamily: 'cursive' }}>Change Color</Typography> */}

        </Box>
    )
}

