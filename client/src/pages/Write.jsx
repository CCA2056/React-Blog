import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import moment from 'moment';

// Custom toolbar with image insert functionality
const modules = {
  toolbar: {
    container: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'], // Add image upload functionality
    ],
    handlers: {
      image: function () {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          const file = input.files[0];
          const formData = new FormData();
          formData.append('file', file);

          try {
            const res = await axios.post('http://localhost:8800/api/upload', formData);
            const imgUrl = res.data;
            const range = this.quill.getSelection();
            this.quill.insertEmbed(range.index, 'image', imgUrl);
          } catch (err) {
            console.log(err);
          }
        };
      },
    },
  },
};

const Write = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [value, setValue] = useState(state?.title || '');
  const [title, setTitle] = useState(state?.description || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('http://localhost:8800/api/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      if (state) {
        await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
          title,
          description: getText(value),
          cat,
          img: file ? imgUrl : '',
        }, {
          withCredentials: true,
        });
      } else {
        await axios.post(`http://localhost:8800/api/posts/`, {
          title,
          description: getText(value),
          cat,
          img: file ? imgUrl : '',
          date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        }, {
          withCredentials: true,
        });
      }
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={getText(title)}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules} // Attach the custom toolbar with image handler
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            style={{ display: 'none' }}
            type="file"
            name=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === 'aviation'}
              value="aviation"
              id="aviation"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="aviation">Aviation Photos</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === 'cars'}
              value="cars"
              id="cars"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cars">Cars Photos</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === 'models'}
              value="models"
              id="models"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="models">Models</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === 'car-reviews'}
              value="car-reviews"
              id="car-reviews"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="car-reviews">Car Reviews</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === 'technology'}
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === 'photography'}
              value="photography"
              id="photography"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="photography">Other Photos</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
