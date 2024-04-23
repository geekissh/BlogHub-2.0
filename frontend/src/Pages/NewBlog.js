import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function NewBlog({setCount, count}) {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const navigateTo = useNavigate()

  const newPost = (e)=>{
    e.preventDefault()
    const postData = async (obj)=>{
      const options = {
        method : 'POST',
        headers : {'Content-Type': 'application/json',
                    'Accept':'application/json'},
        body : JSON.stringify(obj)
      }
      const fetchData = await fetch('/post/new', options);
      const res = await fetchData.json()
      if(fetchData.status === 200){
        navigateTo("/blog")
        setCount(count+1)
      }
      return res;
    }
    const callFunc = async ()=>{
      const obj = {
        title:title,
        content:content
      }
      const data = await postData(obj)
      console.log(data)
    }

    callFunc()
    setTitle("")
    setContent("")
  }
  return (

    <div className='signUp'>
      <form className='form register create' onSubmit={newPost}>
        <div className='create-container'>
          <h1>If you want to achieve....</h1>
        </div>
        <div className='title-area'>
          <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}}placeholder='Title'/>
        </div>
        <div className='textarea'>
          <textarea value={content} onChange={(e)=>{setContent(e.target.value)}}placeholder="Serve your thoughts..."></textarea>
        </div>
        <div className='btn-div'>
          <input className='btn' type='submit' value='Post' />
        </div>
      </form>
      <div className='form-image register'>
        <img src='/images/signUp.jpg' alt='' />
      </div>
    </div>
  )
}

export default NewBlog