import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({setPostData, getUser}) {
  const navigate = useNavigate();
  const [refPost, setRefPost] = useState([])

  const deletePost = (id)=>{
    const postData = async () => {
      const options = {
        method : 'POST'
      }
      const fetchData = await fetch(`/post/${id}/delete`,options);
      const res = await fetchData.json();
      if(fetchData.status === 200){
        navigate("/profile");
      }
      return res;
    };
    const callFunc = async () => {
      await postData();
    };

    callFunc();
  }

  const updatePost=(id)=>{
    const getData = async () => {
      const fetchData = await fetch(`/post/${id}`);
      const res = await fetchData.json();
      if (fetchData.status === 200) {
        setPostData(res)
        navigate("/update");
      }
      return res;
    };
    const callFunc = async () => {
      await getData();
    };

    callFunc();
  }

  useEffect(()=>{
    const postData = async () => {
      const fetchData = await fetch(`/${getUser}/posts`);
      const res = await fetchData.json();
      if (fetchData.status === 200) {
        setRefPost([...res])
      }
      return res;
    };
    const callFunc = async () => {
      await postData();
    };

    callFunc();
  },[getUser])

  return (
    <div className="blog-container">
      <div className="multiple-blog">
        {refPost.map((data, i) => {
          return (
            <div className="single-blog">
              <div className="user-name bg ">
                <h2>{data.username}</h2>
                <h3>{data.name}</h3>
              </div>
              <div className="blog-titte bg">
                <h3>{data.title}</h3>
                <p>{data.date}</p>
              </div>
              <div className="blog-content bg">
                <p>
                  {data.content}
                </p>
              </div>
              <div className="bg bg-btn">
                <input className='btn' type='submit' value='Update' onClick={()=>updatePost(data.id)}/>
                <input className='btn' type='submit' value='Delete' onClick={()=>deletePost(data.id)}/>
              </div>
            </div>
          );
        })}
        </div>
    </div>
  );
}

export default Profile;
