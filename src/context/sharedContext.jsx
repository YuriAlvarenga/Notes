import React, {createContext, useContext, useEffect, useState} from "react"
import api from "../services/api"
import { AuthContext } from "./authContext"
import { ContactlessOutlined } from "@mui/icons-material"


export const SharedContext = createContext()

export function SharedProvider({children}){


    const [sharedNotes, setSharedNotes] = useState([])
    const [sharedUsersNotes, setUsersSharedNotes] = useState([])
    const [unreadNotesCount, setCountNotification] = useState([])

    const {token} = useContext(AuthContext)

    async function GetSharedNotes(){
      setSharedNotes([])
      try{
        const response = await api.get('/shared-notes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setSharedNotes(response.data)
      }catch{
        console.log('Nenhuma nota compartilhada no momento')
      }
    }
    useEffect(()=>{
      if(token){
        GetSharedNotes()
      }
    },[token])
 

    async function GetSharedUsers(){
      try {
        const response = await api.get("/shared-users", {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        setUsersSharedNotes(response.data)
      } catch{
        console.log("Erro ao obter usuários compartilhados")
      }
    }
  
    useEffect(() => {
      if(token){
        GetSharedUsers()
      }
    }, [token])


    async function ShareNote(email, taskId){
        try {
            await api.post('/shared-notes', { email, note_id: taskId })
            GetSharedUsers()
            return { success: true, message: 'Note shared with success'}
        }catch (error) {
          const errorMessage =
            error.response && error.response.status === 404
              ? 'Email not found'
              : error.response && error.response.status === 400
              ? 'Note already shared with this user'
              : 'Error sharing note'
          return { success: false, message: errorMessage }
        }
    }


    const DeleteSharedNote = async (sharedUserId, noteId) => {
      try {
          const response = await api.delete(`/shared-notes/${sharedUserId}/${noteId}`)
          if (response.status === 200) {
              console.log('Compartilhamento excluído com sucesso')
              setSharedNotes(prevSharedNotes => {
                return prevSharedNotes.filter(noteShared => noteShared.note.id !== noteId)
            })
            setUsersSharedNotes(prevSharedUsers => prevSharedUsers.filter(user => user.id !== sharedUserId))
          } else {
              console.error('Erro ao excluir compartilhamento:', response.data.detail)
          }
      } catch (error) {
          console.error('Erro ao excluir compartilhamento:', error)
      }
    }
   
    return(
        <SharedContext.Provider value={{ShareNote, sharedUsersNotes, sharedNotes, setSharedNotes, unreadNotesCount, setCountNotification, DeleteSharedNote }}>
            {children}
        </SharedContext.Provider>
    )
}