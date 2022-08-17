import React, { useState, useContext, useEffect } from "react";
import Topbar from "./Topbar";
import ReactContext from "../context/react-context";
import EditModal from "./EditModal";

const Profile = (props) => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const reactCtx = useContext(ReactContext);

  const showEditModal = () => {
    setEditModal(!editModal);
  };

  const fetchUser = async (url, config) => {
    try {
      const url = `http://localhost:5001/users/viewUser`;
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + reactCtx.token.access,
        },
      };

      const res = await fetch(url, config);
      const data = await res.json();

      if (res.status !== 200) {
        throw new Error("cannot be found");
      }

      setUser(data[0]);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  console.log(user);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <img
        src="https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        className="w-full h-full"
      ></img>
      <div className="absolute top-1/4 left-1/4 rounded-lg h-1/2 w-1/2 border-black/90 border-4 bg-white/80">
        <div className="text-2xl mx-5 my-5">Your Profile</div>
        <div className="text-xl mx-5 my-5">Username: {user.username}</div>
        <div className="text-xl mx-5 my-5">Name: {user.name}</div>
        <div className="text-xl mx-5 my-5">Address: {user.address}</div>
        <button
          onClick={showEditModal}
          className="bg-yellow-300 mx-5 my-5 px-5 py-1 text-md text-plumish font-semibold rounded-full border border-black hover:text-stone-400  hover:border-gray-900 focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
        >
          Edit
        </button>
      </div>
      {editModal && (
        <EditModal
          fetchUser={fetchUser}
          showEditModal={showEditModal}
        ></EditModal>
      )}
    </div>
  );
};

export default Profile;
