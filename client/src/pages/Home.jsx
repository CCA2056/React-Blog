import React, { useEffect,useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

const Home = () => {
  const [post,setPost] = useState([]);
  const cat = useLocation().search
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
        setPost(res.data);
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  },[cat]);

  // const post = [
  //   {
  //     id:1,
  //     title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed. ",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed.",
  //     img:"https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id:2,
  //     title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed. ",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed.",
  //     img:"https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id:3,
  //     title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed. ",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed.",
  //     img:"https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id:4,
  //     title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed. ",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed.",
  //     img:"https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   }
  // ]

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className="posts">
        {post.map(post=>(
          <div className='post' key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className = "link" to={`/post/${post.id}`}>
              <h1>{getText(post.title)}</h1>
              </Link>
              <p>{getText(post.description)}</p>
              <button>Read more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home