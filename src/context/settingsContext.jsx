import React, { useState, createContext, useContext, useEffect } from 'react'
import { AuthContext } from './authContext'
import api from '../services/api'

export const SettingsContext = createContext()

export function SettingsProfile({ children }) {
    const { token } = useContext(AuthContext)
    const [userProfile, setUserProfile] = useState(null)

    // Estados para armazenar valores editados
    const [editedUser, setEditedUser] = useState('')
    const [editedPassword, setEditedPassword] = useState('')

    const ProfileUser = async () => {
        if (token) {
            try {
                const response = await api.get('/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserProfile(response.data)
            } catch {
                console.error("error ao buscar usuário")
            }
        }
    }
    useEffect(() => {
        ProfileUser()
    }, [token])


    //requisição para rota de update user and password

    const UpdateUser = async (editedUser, editedPassword) => {
        try {
            await api.put('/users', {
                name: editedUser,
                password: editedPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            ProfileUser()
        } catch (error) {
            console.error('Erro ao atualizar usuário e senha:', error)
        }
    }


    return (
        <SettingsContext.Provider value={{ userProfile, UpdateUser, ProfileUser, editedUser, editedPassword, setEditedUser, setEditedPassword }}>
            {children}
        </SettingsContext.Provider>
    )
}