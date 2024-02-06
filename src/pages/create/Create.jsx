import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Create.css"
import { toast } from 'react-toastify';

function Create() {
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [location, setLocation] = useState("")
  const [age, setAge] = useState("")

  const navigate = useNavigate()

  const createData = async (api, config)=>{
    await fetch(api, config)
    await navigate("/")
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const obj = {
      id: `${Math.floor(Math.random()*99999)}`,
      name: name,
      desc: desc,
      location: location,
      age: age,
    }
    createData("http://localhost:3000/people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj)
    })
    toast.success("added successfully✅")
  }

  return (
    <div className="create">
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        onChange={(e)=>setName(e.target.value)}
        placeholder="Name..."
        type="text"
      />
      <label htmlFor="description">Description:</label>
      <input
        onChange={(e)=>setDesc(e.target.value)}
        
        placeholder="Description..."
        type="text"
      />  
      <label htmlFor="description">Location:</label>
      <input
        onChange={(e)=>setLocation(e.target.value)}
        
        placeholder="Location..."
        type="text"
      />  
      <label htmlFor="description">Age:</label>
      <input
        onChange={(e)=>setAge(e.target.value)}
        
        placeholder="Age..."
        type="text"
      />  
        <button>Create</button>
      </form>
    </div>
  )
}

export default Create