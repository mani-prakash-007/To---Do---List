import React, { useState } from 'react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_SERVER_URL
function Create_Task({addTask}) {
    const [task , setTask] = useState("")
    const handleTask = (e) => {
      e.preventDefault();
      if(task){
        axios.post(`${baseUrl}/add`,{task : task})
        .then(result => {
          addTask(result.data);
          setTask("");
        }).catch(error => console.log(error)) 
      }else{
        alert("Enter a Task...!!!")
      }
    }
  return (
    <div className='create_form'>
        <input type="text" placeholder='Enter Task' value= {task} onChange={(e) => setTask(e.target.value)}/>
        <button type="button" onClick={handleTask}>Add Task</button>
    </div>
  )
}

export default Create_Task