import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/login.css";

import { AuthContext } from "../../context/auth-context";

const Login = () => {
  const [userInput, setUserInput] = useState({
    password: "",
    email: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  //console.log(currentUser);

  const onLoginHandler = async (event) => {
    event.preventDefault();
    try {
      // console.log(userInput);
      // await axios.post("/auth/login", userInput);
      await login(userInput);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  const onChangeInputHandler = (event) => {
    setUserInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="login-form-container">
      <form className="login-form">
        <div className="login-form-content">
          <h3 className="login-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label className="login-form-label">Email Address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter Email"
              name="email"
              onChange={onChangeInputHandler}
            />
          </div>
          <div className="form-group mt-3">
            <label className="login-form-label"> Passowrd </label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter Password"
              name="password"
              onChange={onChangeInputHandler}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onLoginHandler}
            >
              Log In
            </button>
          </div>
          {error && <p className="error-login">{error}</p>}
          <span>
            Dont have an account? <Link to="/sign-up">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
