import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/menu.css";

const Menu = (props) => {
  console.log(JSON.stringify(props));
  const category = props.category;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${category}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category]);
  return (
    <div className="menu">
      <h1 className="menu-h1">Other Posts you may like</h1>
      {posts
        .filter((post) => post.id !== props.id)
        .map((post) => (
          <div className="menu-post" key={post.id}>
            <img
              className="menu-post-img"
              src={`../uploads/${post.img}`}
              alt=""
            />
            <h2 className="menu-h2">{post.title}</h2>
            <Link className="link" to={`/post/${post.id}`}>
              <button className="menu-button"> Read More</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Menu;
