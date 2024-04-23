import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Update({ postData }) {
  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState(postData.content);
  const id = postData.post_id

  const navigateTo = useNavigate();

  const updatePost = (e) => {
    e.preventDefault()
    const postData = async (obj)=>{
      const options = {
        method : 'POST',
        headers : {'Content-Type': 'application/json',
                    'Accept':'application/json'},
        body : JSON.stringify(obj)
      }
      const fetchData = await fetch(`/post/${id}/update`, options);
      const res = await fetchData.json()
      if(fetchData.status === 200){
        navigateTo("/profile")
      }
      return res;
    }
    const callFunc = async ()=>{
      const obj = {
        title:title,
        content:content
      }
      await postData(obj)
    }

    callFunc()
    setTitle("");
    setContent("");
  };
  return (
    <div className="signUp">
      <div className="form-image register">
        <img src="/images/signUp.jpg" alt="" />
      </div>
      <form className="form register create" onSubmit={updatePost}>
        <div className="create-container">
          <h1>If you want to achieve....</h1>
        </div>
        <div className="title-area">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="textarea">
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="Serve your thoughts..."
          ></textarea>
        </div>
        <div className="btn-div">
          <input className="btn" type="submit" value="Post" />
        </div>
      </form>
    </div>
  );
}

export default Update;
