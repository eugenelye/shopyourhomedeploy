import { NavLink } from "react-router-dom";
import MyAccount from "./MyAccount";
import { Icon } from "@iconify/react";
import ReactContext from "../context/react-context";
import React, { useContext } from "react";

function Topbar() {
  const reactCtx = useContext(ReactContext);

  const isLoggedIn = reactCtx.token;

  return (
    <>
      <div className="bg-yellow-300 h-20">
        <NavLink to="/" className="relative top-5 text-sm mx-8 hover:underline">
          <Icon
            className="inline-block w-16 h-8"
            icon="ant-design:home-filled"
          />
        </NavLink>
        <NavLink
          to="/living"
          className="relative top-5 text-sm mx-8 my-10 px-2 hover:underline hover:opacity-50"
        >
          <Icon className="inline-block w-16 h-8" icon="ic:baseline-living" />
          Living
        </NavLink>
        <NavLink
          to="/dining"
          className="relative top-5 text-sm mx-8 my-10 px-2 hover:underline hover:opacity-50"
        >
          <Icon
            className="inline-block w-16 h-8"
            icon="ic:baseline-local-dining"
          />
          Dining
        </NavLink>
        <NavLink
          to="/kitchen"
          className="relative top-5 text-sm mx-8 px-2 hover:underline hover:opacity-50"
        >
          <Icon
            className="inline-block w-16 h-8"
            icon="fa6-solid:kitchen-set"
          />
          Kitchen
        </NavLink>
        <NavLink
          to="/bath"
          className="relative top-5 text-sm mx-8 px-2 hover:underline hover:opacity-50"
        >
          <Icon className="inline-block w-16 h-8" icon="fa:bath" />
          Bath
        </NavLink>
        <NavLink
          to="/bedroom"
          className="relative top-5 text-sm px-2 mx-8 hover:underline hover:opacity-50"
        >
          <Icon className="inline-block w-16 h-8" icon="bxs:bed" />
          Bedroom
        </NavLink>

        {isLoggedIn ? (
          <MyAccount />
        ) : (
          <>
            <NavLink
              to="/login"
              className="text-white relative top-5 mx-8 my-5 px-5 py-1 bg-sky-600 hover:bg-sky-700"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="text-white relative top-5 px-5 py-1 mx-8 my-5 bg-sky-600 hover:bg-sky-700"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </>
  );
}

export default Topbar;
