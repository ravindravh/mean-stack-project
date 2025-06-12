import React,{useState} from 'react'

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const collectData = ()=> {
        console.warn(name,email,password)
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