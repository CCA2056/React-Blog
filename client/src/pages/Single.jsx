import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu } from '../components/Menu'
import axios from "axios"
import moment from "moment"
import { AuthContext } from '../context/authContext'

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation()
  const navigate = useNavigate()
  const postId = location.pathname.split("/")[2]
  const { currentUser } = useContext(AuthContext)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
        withCredentials: true   // Ensures cookies are sent with the request
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='single'>
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>

          {/* Only show "Edit" and "Delete" if the current user is logged in and is the author of the post */}
          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <button>Edit</button>
              </Link>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>

        <h1>{getText(post.title)}</h1>
        {getText(post.description)}
      </div>
      <Menu cat={post.cat} />
    </div>

  )
}

export default Single