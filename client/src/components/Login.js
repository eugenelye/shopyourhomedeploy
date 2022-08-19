import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import ReactContext from "../context/react-context";

function Login(props) {
  const [failedLogin, setFailedLogin] = useState(true);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const reactCtx = useContext(ReactContext);

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    const url = "/users/login";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    const loginData = await res.json();
    console.log(loginData);

    localStorage.setItem("auth", JSON.stringify(loginData));
    reactCtx.setToken(loginData);

    if (loginData.status === "error") {
      console.log(loginData.message);
      alert(`Unauthorized. Please try again`);
    } else {
      setFailedLogin(!failedLogin);
      failedLogin ? navigate("/") : console.log("No change");
    }
  };

  return (
    <div>
      <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80"></img>
      <div class="absolute left-1/4 top-1/4 w-1/2 h-1/2 border-2 border-black rounded-lg bg-white/70">
        <h2 className="text-2xl mx-5 my-5">
          Please enter username and password{" "}
        </h2>
        <form onSubmit={handleOnSubmit}>
          <div className="block mx-5 my-5 ">
            <label> Username </label>
            <input
              type="text"
              name="username"
              ref={usernameRef}
              placeholder="username"
              className="border-2 border-black/50 absolute left-28 rounded-full"
            />
          </div>
          <div class="block mx-5 my-5 ">
            <label> Password </label>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              placeholder="password"
              className="border-2 border-black/50 absolute left-28 rounded-full"
            />
          </div>
          <button
            type="submit"
            className="mx-5 my-5 px-5 py-2 text-md bg-yellow-300 text-black font-semibold rounded-full border-black hover:text-slate-700 hover:bg-plumish hover:border-black/40 focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
