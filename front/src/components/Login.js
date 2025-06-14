import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate =useNavigate()
  useEffect(() => {
    const auth = localStorage.getItem('user')
    if(auth){
      navigate('/')
    }
  },[])
  const handleLogin = async () => {
    console.warn(email,password)
    let result = await fetch("http://localhost:5000/login", {
      method : 'post',
      body : JSON.stringify({email, password}),
      headers : {
        'Content-type' : 'Application/json'
      }

    })
    result = await result.json()
    console.warn(result)
    if(result.name){
      localStorage.setItem("user",JSON.stringify(result))
      navigate('/')      
    }else{
      alert("Please enter correct details")
    }
  }
  return (
    <div className='login'>
        <input className='inputbox' type='text' onChange={(e)=> setEmail(e.target.value)}  value={email} placeholder='Enter Email' />
        <input className='inputbox' type='password' onChange={(e)=> setPassword(e.target.value)} value={password} placeholder='Enter Password' />
        <button className='appButton' type='button' onClick={handleLogin} > Login </button>
    </div>
  )
}

export default Login