import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //Check existing user;
  const emailQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(emailQuery, [req.body.email, req.body.name], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");

    // Hash Password and create user
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const insertUserIntoDbQuery =
      "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";

    const values = [req.body.username, req.body.email, hashPassword];

    db.query(insertUserIntoDbQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req, res) => {
  console.log("Logging in");
  //Check if user exists
  const checkUserQuery = "SELECT * FROM users WHERE email=?";

  db.query(checkUserQuery, [req.body.email], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length === 0) return res.status(404).json("User Not Found!");

    //Check passowrd
    const isPassowrdValid = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPassowrdValid)
      return res
        .status(404)
        .json("Incorrect Password. Please update the password");

    //Creating json web token
    const jwtToken = jwt.sign({ id: data[0].id }, "userLoggedIn");
    const { password, ...otherInformation } = data[0];
    res
      .cookie("access_token", jwtToken, {
        httpOnly: true,
      })
      .status(200)
      .json(otherInformation);
  });
};

export const logout = (req, res) => {
  return res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been Logged Out");
};
