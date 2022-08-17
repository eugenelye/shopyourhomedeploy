import React, { useState, useContext } from "react";
import ReactContext from "../context/react-context";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

export default function BasicMenu() {
  const reactCtx = useContext(ReactContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    reactCtx.setToken("");
  };

  return (
    <div className="relative top-5 inline-block mx-10s bg-sky-600 rounded-full text-base">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "white",
          fontSize: 12,
        }}
        className="text-base"
      >
        Your Account
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          sx={{
            fontSize: 12,
          }}
          component={Link}
          to={"/profile"}
          onClick={handleClose}
        >
          Profile
        </MenuItem>
        <MenuItem
          sx={{
            fontSize: 12,
          }}
          component={Link}
          to={"/cart"}
          onClick={handleClose}
        >
          Cart
        </MenuItem>
        <MenuItem
          sx={{
            fontSize: 12,
          }}
          component={Link}
          to={"/order"}
          onClick={handleClose}
        >
          Order
        </MenuItem>
        <MenuItem
          sx={{
            fontSize: 12,
          }}
          onClick={handleLogout}
          component={Link}
          to={"/logout"}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
