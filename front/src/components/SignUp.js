import React,{useEffect, useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'

const SignUp = () => {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate =useNavigate()

    useEffect(()=>{
      const auth = localStorage.getItem("user")
      if (auth){
        navigate('/')
      }
    })

    const collectData = async ()=> {
        console.warn(name,email,password)
        let result =await fetch('http://localhost:5000/register', {
          method : 'post',
          body : JSON.stringify({name, email, password}),
          headers : {
            'Content-Type' : 'Application/json'
          },

        })
        
        result = await result.json()
        console.warn(result)
        if (result){
          localStorage.setItem("user",JSON.stringify(result))
          navigate("/")
        }

    }

  return (
    <div className='register'>
        <h1>Register</h1>
        <input className='inputbox' type='text' onChange={(e)=> setName(e.target.value)} placeholder='Enter Name' />
        <input className='inputbox' type='text' onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Email' />
        <input className='inputbox' type='password' onChange={(e)=> setPassword(e.target.value)} placeholder='Enter Password' />
        <button className='appButton' type='button' onClick={collectData} > SignUp </button>
        
    </div>
  )
}

export default SignUp