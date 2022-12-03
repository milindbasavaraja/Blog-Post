import React, { useContext, useEffect, useState } from "react";
import "./css/single.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../UI/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../context/auth-context";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigation = useNavigate();
  console.log("The locations is", location);
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        console.log(JSON.stringify(res));
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  const { currentUser } = useContext(AuthContext);

  const userImageDisplay = post.userImage ? (
    <img className="user-single-image" src={post.userImage} alt="" />
  ) : (
    <i className="fa-regular fa-user fa-2xl"></i>
  );

  const onDeleteHandler = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single">
      <div className="content-single">
        <img
          className="content-single-image"
          src={`../uploads/${post.img}`}
          alt=""
        />
        <div className="user-single">
          {userImageDisplay}
          <div className="info-single">
            <span className="span-user-name">{post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit-single">
              <Link className="link-single" to={`/write?edit=2`} state={post}>
                <i className="fa-solid fa-pen"></i>
              </Link>
            </div>
          )}
          {currentUser.username === post.username && (
            <div className="delete-single">
              <i
                onClick={onDeleteHandler}
                className="fa-solid fa-trash edit-image"
              ></i>
            </div>
          )}
        </div>
        <h1 className="content-single-h1">{post.title}</h1>
        {post.desc}
      </div>

      <Menu category={post.category} id={post.id} />
    </div>
  );
};

export default Single;
