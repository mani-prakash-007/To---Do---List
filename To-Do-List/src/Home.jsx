import React, { useState } from 'react'
import Create_Task from './Create_Task'
import axios from 'axios'

export const Home = () => {
    const [todos,setTodos] = useState([])
    useEffect(()=>{

    })
  return (
    <div className='home'>
        <h1>Todo List</h1>
        <Create_Task/>
        {
            todos.length === 0 ? 
            <div><h2>No Records</h2></div>
            :
            todos.map(todo =>(
                <div>
                    {todo}
                </div>
            ))
        }
    </div>
  )
}
