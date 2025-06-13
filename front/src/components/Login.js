import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate =useNavigate()
  const handleLogin = () => {
    console.warn(email,password)

  }
  return (
    <div className='login'>
        <input className='inputbox' type='text' onChange={(e)=> setEmail(e.target.value)}  value={email} placeholder='Enter Email' />
        <input className='inputbox' type='password' onChange={(e)=> setPassword(e.target.value)} value={password} placeholder='Enter Password' />
        <button className='appButton' type='button' onClick={handleLogin} > SignUp </button>
    </div>
  )
}

export default Login