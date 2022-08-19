import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";

function Register(props) {
  const [regoFaliled, setRegoFailed] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const addressRef = useRef();

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
      address: addressRef.current.value,
    };
    const url = "/users/registration";
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const regData = await res.json();
    console.log(regData);

    if (regData.status === "error") {
      alert(`${regData.message}`);
    } else if (regData.status === "ok") {
      setRegoFailed(!regoFaliled);
      setRegoFailed ? navigate("/login") : console.log("Complete fields");
    }
  };

  return (
    <div>
      <img
        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/grt-oxford-home-131-1549303951.jpg?crop=1.00xw:0.752xh;0,0.113xh&resize=980:*"
        className="w-full h-full bg-gradient-to-t"
      ></img>
      <div className="bg-white/75 rounded-lg absolute top-1/4 left-1/4  border-4 border-black w-1/2 h-1/2">
        <h2 className="border-black text-2xl text-black my-5 mx-5">
          Please sign up for an account below
        </h2>
        <div>
          <form onSubmit={handleOnSubmit}>
            <div class="mx-5 my-4 block">
              <label> Username </label>
              <input
                type="text"
                name="username"
                ref={usernameRef}
                placeholder="username"
                className="rounded-full border border-black absolute left-32"
              />
            </div>
            <div class="mx-5 my-4 block">
              <label> Password </label>
              <input
                type="password"
                name="password"
                ref={passwordRef}
                placeholder="password"
                className="rounded-full border border-black absolute left-32"
              />
            </div>
            <div class="mx-5 my-4 block ">
              <label> Name </label>
              <input
                type="text"
                name="name"
                ref={nameRef}
                placeholder="name"
                className="rounded-full border border-black absolute left-32"
              />
            </div>
            <div class="mx-5 block">
              <label> Address </label>
              <input
                type="text"
                name="address"
                ref={addressRef}
                placeholder="address"
                className="rounded-full border border-black absolute left-32"
              />
            </div>
            <button
              type="submit"
              className="mx-5 my-5 px-5 py-1 text-md bg-yellow-300 text-plumish font-semibold rounded-full border border-black hover:text-stone-400  hover:border-gray-900 focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
