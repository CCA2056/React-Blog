import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

const Home = () => {
  const [post, setPost] = useState([]);
  const cat = useLocation().search
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
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
    <div className='home'>
      <div className="posts">
        {post.map(post => (
          <div className='post' key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{getText(post.title)}</h1>
              </Link>
              <p>{getText(post.description)}</p>
              <Link className="link" to={`/post/${post.id}`}>
                <button>View detail</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home