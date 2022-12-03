import React, { useState } from "react";
import "./css/write.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const navigation = useNavigate();
  const [description, setDescription] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState(state?.category || "");

  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const onImageChangeHandler = (event) => {
    setImg(event.target.files[0]);
  };

  const onCategoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };

  const onPublishPostHandler = async (event) => {
    event.preventDefault();
    const imageUrl = await uploadImage();
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: description,
            category,
            img: img ? imageUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: description,
            category,
            img: img ? imageUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="write">
      <div className="write-content">
        <input
          className="write-content-input"
          type="text"
          name=""
          value={title}
          placeholder="Title"
          onChange={onTitleChangeHandler}
        />
        <div className="write-content-editor-container">
          <ReactQuill
            className="write-content-editor"
            theme="snow"
            onChange={setDescription}
            value={description}
          />
        </div>
      </div>
      <div className="write-menu">
        <div className="write-menu-item">
          <h1 className="write-menu-item-h1">Publish</h1>
          <span>
            <b>Status: </b> Public
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="write-photo-file"
            onChange={onImageChangeHandler}
          />
          <label
            htmlFor="write-photo-file"
            className="write-menu-item-input-file"
          >
            Upload Image
          </label>

          <div className="write-menu-buttons">
            <button className="write-menu-buttons-save">Save as a Draft</button>
            <button
              className="write-menu-buttons-update"
              onClick={onPublishPostHandler}
            >
              Publish
            </button>
          </div>
        </div>
        <div className="write-menu-item">
          <h1>Category</h1>
          <div className="write-menu-item-category">
            <input
              type="radio"
              name="cat"
              value="art"
              id="art"
              onChange={onCategoryChangeHandler}
              checked={category === "art"}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="write-menu-item-category">
            <input
              type="radio"
              name="cat"
              value="science"
              id="science"
              onChange={onCategoryChangeHandler}
              checked={category === "science"}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="write-menu-item-category">
            <input
              type="radio"
              name="cat"
              value="technology"
              id="technology"
              onChange={onCategoryChangeHandler}
              checked={category === "technology"}
            />
            <label htmlFor="tech">Technology</label>
          </div>
          <div className="write-menu-item-category">
            <input
              type="radio"
              name="cat"
              value="cinema"
              id="cinema"
              onChange={onCategoryChangeHandler}
              checked={category === "cinema"}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="write-menu-item-category">
            <input
              type="radio"
              name="cat"
              value="design"
              id="design"
              onChange={onCategoryChangeHandler}
              checked={category === "design"}
            />
            <label htmlFor="design">Design</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
