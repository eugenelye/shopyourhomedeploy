import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import ReactContext from "./context/react-context";
import Login from "./components/Login";
import Register from "./components/Register";
import Topbar from "./components/Topbar";
import Dining from "./components/Dining";
import Living from "./components/Living";
import Kitchen from "./components/Kitchen";
import Bath from "./components/Bath";
import Bedroom from "./components/Bedroom";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Order from "./components/Order";
import Logout from "./components/Logout";
import Homepage from "./components/Homepage";

function App() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")));
  return (
    <div>
      <ReactContext.Provider
        value={{
          token,
          setToken,
        }}
      >
        <Topbar></Topbar>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/living" element={<Living />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/bath" element={<Bath />} />
          <Route path="/bedroom" element={<Bedroom />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </ReactContext.Provider>
    </div>
  );
}

export default App;
