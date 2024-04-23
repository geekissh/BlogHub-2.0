import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import {BsPersonFill} from 'react-icons/bs'
import {IoMdMail} from 'react-icons/io'
import {PiLockFill, PiLockLight} from 'react-icons/pi'

function SignUp() {
  const [name, setName] = useState("")
  const [username, setUserName] = useState("")
  const [email, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [con_password, setConPass] = useState("")
  const [flash, setFlash] = useState(false)


  const signUp = (e)=>{
    e.preventDefault()
    const postData = async (obj)=>{
      const options = {
        method : 'POST',
        headers : {'Content-Type': 'application/json',
                    'Accept':'application/json'},
        body : JSON.stringify(obj)
      }
      const fetchData = await fetch('/register', options);
      const res = await fetchData.json()
      if(fetchData.status === 200){
        setFlash(!flash)
      }
      return res;
    }
    const callFunc = async ()=>{
      const obj = {
        name:name,
        username:username,
        email:email,
        password:password,
      }
      const data = await postData(obj)
    }

    callFunc()

    setName("")
    setMail("")
    setPassword("")
    setUserName("")
    setConPass("")
  }
  return (
    <div className='auth-container'>
      {flash ?  <h2>Register successfully. Go to login page.</h2>
      :null}
    <div className='signUp'>
      <div className='form register'>
        <form className='form-data' onSubmit={signUp}>
        <h1>Sign Up</h1>
          <div><BsPersonFill className='icons'/><input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' required /></div>
          <div><BsPersonFill className='icons'/><input type='text' value={username} onChange={(e)=>setUserName(e.target.value)} placeholder='Username' required /></div>
          <div><IoMdMail className='icons'/><input type='email' value={email} onChange={(e)=>setMail(e.target.value)} placeholder='Email' required /></div>
          <div><PiLockFill className='icons'/><input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required /></div>
          <div><PiLockLight className='icons'/><input type='password' value={con_password} onChange={(e)=>setConPass(e.target.value)} placeholder='Repeat your password' required /></div>
          {/* <input className='check' type='checkbox' />
          <p>I agree all statements in <NavLink>Terms of service</NavLink></p> */}
          <input className='btn' type='submit' value='Register' />
        </form>
      </div>
      <div className='form-image register'>
        <img src='/images/signUp.jpg' alt='' />
        <NavLink to="/login">I am already a member</NavLink>
      </div>
    </div>
    </div>
  )
}

export default SignUp