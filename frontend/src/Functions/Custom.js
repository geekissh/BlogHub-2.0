import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export function useCustom() {
    const [flash, setFlash] = useState(false)        //to flash registration msg
    const [navbar, setNavbar] = useState(false)   //to change navbar
    const [page, setPage] = useState(false)    //to navigate pages
    const navigate = useNavigate()

    const navigateTo = ()=>{
        navigate("/blog")
    }
    if (page){
        navigateTo()
    }

    const changePages = ()=>{
        setPage(!page)
    }

    const flashMsg = ()=>{
        setFlash(!flash)
    }

    const changeNav = ()=>{
        setNavbar(!navbar)
    }
  return ([flashMsg, changePages, navbar, changeNav])
}
