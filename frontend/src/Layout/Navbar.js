import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'


function Navbar({navbar}) {
  return (
    <>
    <div className='navbar'>
        <div className='left'><NavLink to='/'><h1>Blog<span>Hub</span></h1></NavLink></div>
        <div className='right'>
            <NavLink to='/'><h2>Home</h2></NavLink>
            {navbar ? (
                <>
                <NavLink to='/blog'><h2>Blogs</h2></NavLink>
                <NavLink to='/newblog'><h2>Create</h2></NavLink>
                </>
            ):(
                <>
                <NavLink to='/login'><h2>Log In</h2></NavLink>
                <NavLink to='/signup'><h2>Sign Up</h2></NavLink>
                </>
            )}
        </div>
    </div>
    </>
  )
}

export default Navbar