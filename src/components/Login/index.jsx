import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { MdLocalPostOffice } from "react-icons/md";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [passoword, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
    setErrMsg("");
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
    setErrMsg("");
  };

  const onLoginSubmit = (event) => {
    event.preventDefault();
    console.log("hello heyd");
    if (username === "eshwar" && passoword === "eshwar@123") {
      Cookies.set("jwt_token", "eshwarLogin", { expires: 1 });
      navigate("/");
    } else {
      if (username === "" && passoword === "") {
        setErrMsg("Please Enter the username and passoword");
      } else if (username !== "eshwar" && passoword === "eshwar@123") {
        setErrMsg("Please Enter the Valid username");
      } else if (username === "eshwar" && passoword !== "eshwar@123") {
        setErrMsg("Please Enter the valid password");
      } else if (username !== "eshwar" && passoword !== "eshwar@123") {
        setErrMsg("Please Enter Valid Credentials");
      }
    }
  };
  console.log(errMsg);

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="login-bg-container">
      <form className="form-container" onSubmit={onLoginSubmit}>
        <h2 className="login-head">
          <MdLocalPostOffice size={20} /> Login
        </h2>
        <label htmlFor="username" className="label-login">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={onUsernameChange}
          className="input-login"
          placeholder="eshwar Basha"
        />
        <label htmlFor="password" className="label-login">
          Password
        </label>
        <input
          type="password"
          className="input-login"
          value={passoword}
          onChange={onPasswordChange}
          id="password"
          placeholder="eshwar@123"
        />
        <button type="submit" className="login-btn">
          Login
        </button>
        {errMsg !== "" && <p className="err-msg">{errMsg}</p>}
      </form>
    </div>
  );
};

export default Login;
