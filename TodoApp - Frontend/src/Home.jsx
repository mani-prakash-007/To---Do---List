import React, { useState , useEffect } from 'react'
import Create_Task from './Create_Task'
import axios from 'axios'
import {BsCircleFill , BsFillTrashFill , BsFillCheckCircleFill} from 'react-icons/bs'

const baseUrl = import.meta.env.VITE_SERVER_URL

export const Home = () => {
    const [todos,setTodos] = useState([])
    useEffect(()=>{
        axios.get(`${baseUrl}/get`).then(result =>setTodos(result.data)).catch(error => console.log("Use effect Error",error))
    }, [])

    const handleEdit =(id)=>{
        axios.put(`${baseUrl}/update/`+id).then(result =>setTodos(todos.map(todo =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
        ))).catch(error => console.log(error))
    }
    const handleDelete = (id) => {
        axios.delete(`${baseUrl}/delete/` + id)
          .then(result =>setTodos(todos.filter(todo => todo._id !== id)))
          .catch(error => console.log(error))
      }

      const addTask = (newTask) => {
        setTodos([...todos, newTask]);
    }; 
  return (
    <div className='home'>
        <h1>Todo List</h1>
        <Create_Task addTask = {addTask}/>
        {
            todos.length === 0 ? 
            <div><h2>No Records</h2></div>
            :
            todos.map(todo =>(
                <div className = 'task' key={todo._id}>
                    <div className = 'checkbox' onClick = {()=> handleEdit(todo._id)}>
                        {todo.done ? <BsFillCheckCircleFill className = 'icon'></BsFillCheckCircleFill>
                        :<BsCircleFill className = 'icon'/>
                        }
                    <p className = {todo.done ? "line-through"  : ""}>{todo.task}</p>
                    </div>
                    <div>
                        <span><BsFillTrashFill className = 'trash' onClick = {()=>{handleDelete(todo._id)}}/></span>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
