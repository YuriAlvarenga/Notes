import React, { createContext, useContext, useState, useEffect } from "react"
import api from '../services/api'
import { AuthContext } from "./authContext"



export const NoteContext = createContext()

export function NoteProvider({children}){
   
  const { token } = useContext(AuthContext)
  const [ task, setTask ] = useState([])
  const [ noteDetails, setNoteDeatails] = useState('')

  //update nota
  const [editedTitle, setEditedTitle] = useState('')
  const [editedTask, setEditedTask] = useState('')
  const [editedPriority, setEditPriority] = useState(false)
  const [ editingTaskId, setEditingTaskId ] = useState(null)
  
 
     
  // retorna tarefas de cada usuário se houver o seu respectivo token
  //requisição para chamar as tasks (notas)
  useEffect(()=>{
    const Tasks = async () => {
      if(token){
        try{
          const response = await api.get('/notes', { 
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setTask(response.data)
        }catch{
          console.error("error ao buscar tarefas.")
        }
      }
    }
    Tasks()
  },[token])

 // requisição para criar nota 
  const CreateTask = async (title, task, priority) => {
    
    try{
      const response = await api.post('/notes',{
        title,
        task,
        priority},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      if (response.status === 201){
        setTask((prevTasks) => [...prevTasks, response.data])
      }
    }catch(error){
      if (error.response) {
        console.error('Detalhes da resposta:', error.response.data)
        console.error('Código de status HTTP:', error.response.status)
      }
    }
    
  } 

  //requisição para deletar task (nota)

  const DeleteTask = async(note_id) => {
    try{
      const response = await api.delete(`/notes/${note_id}`)
      setTask((prevNotes) => prevNotes.filter(note => note.id !== note_id))
    }catch(error){
      if (error.response) {
        // O servidor respondeu com um código de status diferente de 2xx
        console.error('Detalhes da resposta:', error.response.data)
        console.error('Código de status HTTP:', error.response.status)
      }
      console.log("erro ao deletar tarefa", note_id, error)
    }
  }

  //requisição para atualizar nota
  const UpdateTask = async(noteId, editedTitle, editedTask, editedPriority) => {
    try{
      await api.put(`/notes/${noteId}`, {
        title: editedTitle,
        task: editedTask,
        priority: editedPriority
      })
      setTask((prevTasks) =>
        prevTasks.map((note) =>
        note.id === noteId ? {
                ...note,
                title: editedTitle,
                task: editedTask,
                priority: editedPriority
              }
            : note
        )
      )

    }catch (error) {
      if (error.response) {
          // O servidor respondeu com um código de status diferente de 2xx
          console.error('Detalhes da resposta:', error.response.data)
          console.error('Código de status HTTP:', error.response.status)
      }
    }
  }

  // useEffect(() => {
  //   const NoteDetails = async() => {
  //     if(token){
  //       try{
  //         const response = await api.get('/profile', {
  //           headers:{
  //             Authorization : `Bearer ${token}`
  //           }
  //         })
  //         setNoteDeatails(response.data)
  //       }catch(error){
  //         if (error.response) {
  //           // O servidor respondeu com um código de status diferente de 2xx
  //           console.error('Detalhes da resposta:', error.response.data)
  //           console.error('Código de status HTTP:', error.response.status)
  //         }
  //       }
  //     }
  //   }
  //   NoteDetails()
  // }, [token])
  
  return(
    <NoteContext.Provider value={{task, CreateTask, DeleteTask, UpdateTask, editedTitle, setEditedTitle, editedTask, setEditedTask, editedPriority, setEditPriority, editingTaskId, setEditingTaskId, noteDetails }}>
      {children}
    </NoteContext.Provider>
  )
}