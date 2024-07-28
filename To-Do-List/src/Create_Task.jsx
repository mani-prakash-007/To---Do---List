import React, { useState } from 'react'
import axios from 'axios'

function Create_Task() {
    const [task , setTask] = useState("")
    const handleTask = (e) => {
      e.preventDefault();
        axios.post('http://localhost:3000/add',{task : task})
        .then(result => console.log(result))
        .catch(error => console.log(error)) 
    }
  return (
    <div className='create_form'>
        <input type="text" placeholder='Enter Task' onChange={(e) => setTask(e.target.value)} />
        <button type="button" onClick={handleTask}>Add Task</button>
    </div>
  )
}

export default Create_Task