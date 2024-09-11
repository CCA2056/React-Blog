import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // Include the styles for Quill
import axios from "axios"
import { useLocation } from 'react-router-dom'
import moment from 'moment';

const Write = () => {
  const state = useLocation().state
  const [value, setValue] = useState(state?.title || '');
  const [title, setTitle] = useState(state?.description || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post("http://localhost:8800/api/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      if (state) {
        await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
          title, description: value, cat, img: file ? imgUrl : ""
        }, {
          withCredentials: true
        });
      } else {
        await axios.post(`http://localhost:8800/api/posts/`, {
          title, description: value, cat, img: file ? imgUrl : "", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        }, {
          withCredentials: true
        });
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='add'>
      <div className="content">
        <input type='text' value={getText(title)} placeholder='Title' onChange={e => setTitle(e.target.value)}></input>
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: "none" }} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])} />
          <label className="file" htmlFor='file'>Upload Image</label>
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>

          <div className="cat">
            <input type="radio" name="cat" checked={cat === "aviation"} value="aviation" id="aviation" onChange={e => setCat(e.target.value)} />
            <label htmlFor="aviation">Aviation Photos</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" checked={cat === "cars"} value="cars" id="cars" onChange={e => setCat(e.target.value)} />
            <label htmlFor="cars">Cars Photos</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" checked={cat === "models"} value="models" id="models" onChange={e => setCat(e.target.value)} />
            <label htmlFor="models">Models</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" checked={cat === "car-reviews"} value="car-reviews" id="car-reviews" onChange={e => setCat(e.target.value)} />
            <label htmlFor="car-reviews">Car Reviews</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" checked={cat === "technology"} value="technology" id="technology" onChange={e => setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" checked={cat === "photography"} value="photography" id="photography" onChange={e => setCat(e.target.value)} />
            <label htmlFor="photography">Other Photos</label>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Write