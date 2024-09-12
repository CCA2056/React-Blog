import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Menu = ({ cat }) => {

  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`);
        setPost(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='menu'>
      <h1>Other post you may like</h1>
      {post.map(post => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post?.img}`} alt="" />
          <h2>{getText(post.title)}</h2>
          <Link className="link" to={`/post/${post.id}`}>
            <button>View detail</button>
          </Link>
        </div>
      ))}
    </div>
  )
}
