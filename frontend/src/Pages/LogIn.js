import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {BsPersonFill} from 'react-icons/bs'
import {IoMdMail} from 'react-icons/io'
import {PiLockFill} from 'react-icons/pi'

function LogIn({changeNav, setUserData}) {
  const [username, setUserName] = useState("")
  const [email, setMail] = useState("")
  const [password, setPassword] = useState("")

  const history = useNavigate()


  const submitForm = (e)=>{
    e.preventDefault()

    const postData = async (obj)=>{
      const options = {
        method : 'POST',
        headers : {'Content-Type': 'application/json',
                    'Accept':'application/json'},
        body : JSON.stringify(obj)
      }
      const fetchData = await fetch('/login', options);
      const res = await fetchData.json()
      if(fetchData.status === 200){
        setUserData(res)
        changeNav()
        history("/blog")
      }
      return res;
    }
    const callFunc = async ()=>{
      const obj = {
        username:username,
        email:email,
        password:password,
      }
      const data = await postData(obj)
    }

    callFunc()
    setMail("")
    setPassword("")
    setUserName("")

    
  }
  return (
    <div className='signUp'>
      <div className='form-image register'>
        <img src='/images/login.jpg' alt='' />
        <NavLink to="/signup">create an acount</NavLink>
      </div>
      <div className='form register login'>
        <form className='form-data'  onSubmit={submitForm}>
          <h1>Sign In</h1>
          <div><BsPersonFill className='icons'/><input type='text' value={username} onChange={(e)=>setUserName(e.target.value)}placeholder='Username' required /></div>
          <div><IoMdMail className='icons'/><input type='email' value={email} onChange={(e)=>setMail(e.target.value)} placeholder='Email' required /></div>
          <div><PiLockFill className='icons'/><input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required /></div>
          <input className='btn' type='submit' value='Log in' />
        </form>
        <div className='login-logo'>
          <p>Or login with</p>
          <div className='facebook logo'>
            <img src='/images/faceboot-color.png' alt=''></img>
          </div>
          <div className='google logo'>
            <img src='/images/linkedin.png' alt=''></img>
          </div>
          <div className='twitter logo'>
            <img src='/images/twitter-color.png' alt=''></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn