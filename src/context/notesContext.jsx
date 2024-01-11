import React, { createContext, useContext, useState, useEffect } from "react"
import api from '../services/api'
import { AuthContext } from "./authContext"
import { CurrencyRuble } from "@mui/icons-material"


export const NoteContext = createContext()

export function NoteProvider({children}){
   
  const { token } = useContext(AuthContext)
  const [ task, setTask ] = useState([])
  const [updatedTaskData, setUpdatedTaskData] = useState({})
     
  // retorna tarefas de cada usuário se houver o seu respectivo token
  //requisição para chamar as tasks (notas)
  useEffect(()=>{
    const Tasks = async () => {
      if(token){
        try{
          const response = await api.get('/task', { 
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
      const response = await api.post('/task',{
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
        console.log('nota criada com sucesso')
      }
    }catch(error){
      if (error.response) {
        console.error('Detalhes da resposta:', error.response.data)
        console.error('Código de status HTTP:', error.response.status)
      }
    }
    
  } 

  //requisição para deletar task (nota)

  const DeleteTask = async(task_id) => {
    try{
      await api.delete(`/task/${task_id}`)
      setTask((prevTasks) => prevTasks.filter(task => task.id !== task_id))
      console.log('nota deletada com sucesso')
    }catch(error){
      console.log("erro ao deletar tarefa", task_id, error)
    }
  }

 
  return(
    <NoteContext.Provider value={{task, CreateTask, DeleteTask}}>
      {children}
    </NoteContext.Provider>
  )
}