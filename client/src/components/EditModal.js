import React, { useContext, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Icon } from "@iconify/react";
import styles from "./modal.module.css";
import ReactContext from "../context/react-context";
import { useNavigate } from "react-router-dom";

const EditModal = (props) => {
  const reactCtx = useContext(ReactContext);
  const [editFaliled, setEditFailed] = useState(false);
  const nameRef = useRef();
  const addressRef = useRef();

  const navigate = useNavigate();

  const editUser = async (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      address: addressRef.current.value,
    };

    const url = "http://localhost:5001/users/editUser";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + reactCtx.token.access,
      },
    });
    const editUser = await res.json();

    if (editUser.status === "error") {
      alert(`${editUser.message}`);
    } else if (editUser.status === "ok") {
      setEditFailed(!editFaliled);
      setEditFailed ? navigate("/profile") : console.log("Complete fields");
    }
    props.fetchUser();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className="h-1/2 w-2/3 bg-white fixed left-52 top-24 rounded-lg">
            <h2 className="text-xl mx-5 my-5">
              Please put the new information below
            </h2>
            <form onSubmit={editUser}>
              <div className="block mx-5 my-5">
                <label> Name </label>
                <input
                  type="text"
                  name="name"
                  ref={nameRef}
                  placeholder="name"
                  className="rounded-full border border-black absolute left-32"
                />
              </div>
              <div className="block mx-5 my-5">
                <label>Address</label>
                <input
                  type="address"
                  name="address"
                  ref={addressRef}
                  placeholder="&nbsp;address"
                  className="rounded-full border border-black absolute left-32"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-300 mx-2 w-24 h-8 text-md text-plumish font-semibold rounded-full border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
              >
                Edit
              </button>
              <button
                onClick={props.showEditModal}
                className="bg-yellow-300 mx-2 w-24 h-8 text-md text-plumish font-semibold rounded-full border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
              >
                Close
              </button>
            </form>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default EditModal;
