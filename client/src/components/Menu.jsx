import axios from 'axios';
import React, { useEffect, useState } from 'react'

// const post = [
//     {
//       id:1,
//       title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed. ",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed.",
//       img:"https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     },
//     {
//       id:2,
//       title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed. ",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed.",
//       img:"https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     },
//     {
//       id:3,
//       title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed. ",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed.",
//       img:"https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     },
//     {
//       id:4,
//       title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed. ",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus pulvinar semper. Aenean vulputate nisl mi, eget accumsan turpis lobortis sed.",
//       img:"https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     }
//   ]

export const Menu = ({cat}) => {

  const [post,setPost] = useState([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`);
        setPost(res.data);
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  },[cat]);

  return (
    <div className='menu'>
        <h1>Other post you may like</h1>
        {post.map(post=>(
            <div className="post" key = {post.id}>
                <img src={`../upload/${post?.img}`} alt="" />
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}
