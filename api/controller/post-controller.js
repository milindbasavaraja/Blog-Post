import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getAllPosts = (req, res) => {
  console.log("Geetting post by category");
  const getPostQuery = req.query.cat
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  
  db.query(getPostQuery, [req.query.cat], (error, data) => {
    if (error) return res.status(500).send(error);

    return res.status(200).json(data);
  });
};

export const getPostById = (req, res) => {
  console.log("Getting post by id");
  const getPostDetailsQuery =
    "SELECT `username`,p.id as id,`title`,`desc`,`date`,p.img,u.img AS userImage,`category` FROM users u, posts p WHERE u.id = p.uid AND p.id=?";

  db.query(getPostDetailsQuery, [req.params.id], (error, data) => {
    if (error) return res.status(500).send(error);
    console.log(data);
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "userLoggedIn", (error, userInfo) => {
    if (error) res.status(403).json("Token is not valid");
    const insertPostQuery =
      "INSERT INTO posts (`title`,`desc`,`img`,`category`,`date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.category,
      req.body.date,
      userInfo.id,
    ];

    db.query(insertPostQuery, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Post has been created");
    });
  });
};

export const deletePostById = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "userLoggedIn", (error, userInfo) => {
    if (error) res.status(403).json("Token is not valid");

    const postId = req.params.id;
    const deletPostQuery = "DELETE FROM posts WHERE `id`= ? AND `uid` = ?";

    db.query(deletPostQuery, [postId, userInfo.id], (error, data) => {
      if (error) return res.status(403).json("You can delete only your posts.");

      return res.json("Post has been deleted");
    });
  });
};

export const updatePostById = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "userLoggedIn", (error, userInfo) => {
    if (error) res.status(403).json("Token is not valid");
    const postId = req.params.id;
    const updatePostQuery =
      "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `category`=? WHERE `id`=? AND `uid`=?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.category,
    ];

    db.query(
      updatePostQuery,
      [...values, postId, userInfo.id],
      (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Post has been updated");
      }
    );
  });
};
