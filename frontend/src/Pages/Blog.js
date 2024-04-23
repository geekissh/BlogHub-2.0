import React, { useEffect, useState } from "react";
import { BsPersonFill, BsFillBookmarkFill,BsFillBrightnessLowFill,BsClockHistory } from "react-icons/bs";
import {AiOutlineUserSwitch} from 'react-icons/ai'
import {TbRosetteFilled} from 'react-icons/tb'
import {MdReport} from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import Pagination from "../Layout/Pagination";

function Blog({changeNav, userData, setUser}) {
  const navigate = useNavigate();
  const [post, setpost] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const postData = async () => {
      const fetchData = await fetch("/totalposts");
      const res = await fetchData.json();
      if (fetchData.status === 200) {
        setpost([...res]);
      }
      return res;
    };
    const callFunc = async () => {
      await postData();
    };

    callFunc();
  }, []);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  const logOut = () => {
    const postData = async () => {
      const fetchData = await fetch("/logout");
      const res = await fetchData.json();
      if (fetchData.status === 200) {
        changeNav();
        navigate("/login");
      }
      return res;
    };
    const callFunc = async () => {
      await postData();
    };

    callFunc();
  };

  const goToProfile = (username)=>{
    setUser(username)
    navigate("/profile")
  }

  return (
    <div className="blog-container">
      <div className="multiple-blog">
        {currentPosts.map((data, i) => {
          return (
            <div className="single-blog">
              <div className="user-name bg ">
                <h2 onClick={()=>goToProfile(data.username)}>{data.username}</h2>
                <h3>{data.name}</h3>
              </div>
              <div className="blog-titte bg">
                <h3>{data.title}</h3>
                {/* <p>{data.date}</p> */}
              </div>
              <div className="blog-content bg">
                <p>
                  {data.content}
                </p>
              </div>
              {/* <div className="bg bg-btn">
              <input className='btn' type='submit' value='Update' onClick={()=>updatePost(data.id)}/>
              <input className='btn' type='submit' value='Delete' onClick={()=>deletePost(data.id)}/>
              </div> */}
            </div>
          );
        })}

        <Pagination postsPerPage={postsPerPage}
        totalPosts={post.length}
        paginate={paginate}/>
      </div>
      <div className="card-container">
        <div className="inner-card">
          <div className="profile com">
            {/* <h3>
              <BsPersonFill className="iconss" />
              {userData["username"]}
            </h3> */}
            <h2>
              <BsPersonFill className="iconss" />
              {userData["name"]}
            </h2>
          </div>
          <div className="options com">
            <p>
              <TbRosetteFilled className="iconss" />
              Settings
            </p>
            <p>
              <BsClockHistory className="iconss" />
              Your Activity
            </p>
            <p>
              <BsFillBookmarkFill className="iconss" />
              Saved
            </p>
            <p>
              <BsFillBrightnessLowFill className="iconss" />
              Switch appearence
            </p>
            <p>
              <MdReport className="iconss" />
              Report a problem
            </p>
            <p>
              <AiOutlineUserSwitch className="iconss" />
              Switch accounts
            </p>
            <p className="logout" onClick={logOut}>
              <BsPersonFill className="iconss" />
              Log out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
