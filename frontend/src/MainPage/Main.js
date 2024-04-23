import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from '../Layout/Navbar'
import Home from '../Pages/Home'
import SignUp from '../Pages/SignUp'
import LogIn from '../Pages/LogIn'
import Blog from '../Pages/Blog'
import NewBlog from '../Pages/NewBlog'
import Update from '../Pages/Update'
import Profile from '../Pages/Profile'


function Main() {
  const [navbar, setNav] = useState(false)
  const [userData, setUserData] = useState({})
  const [postData, setPostData] = useState({})
  const [getUser, setUser] = useState("")
  const [count, setCount] = useState(0)
    const changeNav = ()=>{
        setNav(!navbar)
    }
  return (
      <div className='main'>
          <Navbar navbar = {navbar}/>
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/signup' element={<SignUp />}/>
              <Route path='/login' element={<LogIn changeNav ={changeNav} setUserData={setUserData} />}/>
              <Route path='/blog' element={<Blog  changeNav ={changeNav} userData = {userData} setCount={setCount} count={count} setPostData={setPostData} setUser={setUser}/>}>
              </Route>
              <Route path='/newblog' element={<NewBlog setCount={setCount} count={count}/>}/>

              <Route path='/update' element={<Update postData={postData} setCount={setCount} count={count}/>} />

              <Route path='/profile' element={<Profile postData={postData} setPostData={setPostData} getUser={getUser}/>} />
          </Routes>
      </div>
  )
}

export default Main