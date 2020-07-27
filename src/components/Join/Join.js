import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import configs from "../../configs";
import "./Join.css";

function SignIn({ setAuth, isAuth }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState({
    name: "",
    password: "",
  });
  const history = useHistory();

  function handleSignIn(payload) {
    axios
      .post(configs.apiUrl + "/auth/signIn", payload)
      .then(function (response) {
        if (response.status === 201) {
          localStorage.setItem("conversation#token", response.data.token);
          localStorage.setItem("user", payload.name);
          setAuth(true);
          history.push({
            pathname: "/chat",
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err.response.data.message);
        } else {
          alert("Server is down");
        }
      });
  }

  function handleRegistration(payload) {
    axios
      .post(configs.apiUrl + "/auth/signUp", payload)
      .then(function (response) {
        if (response.status === 201) {
          localStorage.setItem("conversation#token", response.data.token);
          localStorage.setItem("user", payload.name);
          setAuth(true);
          history.push({
            pathname: "/chat",
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err.response.data.message);
        } else {
          alert("Server is down");
        }
      });
  }

  function handleChange(e) {
    const target = e.target;
    setState((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setErrorMessage("");
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            name={"name"}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            className="joinInput mt-20"
            type="password"
            name={"password"}
            onChange={handleChange}
          />
        </div>
        <p style={{ color: "red" }}> {errorMessage}</p>
        <button
          className="button mt-20"
          type="submit"
          disabled={!state.name.length || !state.password.length}
          onClick={() => handleSignIn(state)}
        >
          Sign In
        </button>
        <button
          className="button mt-20"
          type="submit"
          disabled={!state.name.length || !state.password.length}
          onClick={() => handleRegistration(state)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignIn;
