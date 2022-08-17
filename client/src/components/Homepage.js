import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  
  const toLiving = (event) =>{
    event.preventDefault();
    navigate("/living")
  }
  return (
    <>
      <img
        src="https://media.designcafe.com/wp-content/uploads/2020/03/21014139/blue-living-room-ideas.jpg"
        alt=""
        className="w-full"
      ></img>
      <div className=" absolute top-1/3 left-28">
        <div className="text-6xl text-white font-aboreto">Fill your home with quality pieces</div>
        <button className=" relative left-1/2 my-5 px-5 border-2 text-lg"onClick={toLiving}>Shop Now<Icon icon="akar-icons:arrow-right" className="inline-block"></Icon></button>
      </div>
      
    </>
  );
};

export default Homepage;
