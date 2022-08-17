import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import List from "./List";

const Bedroom = () => {
  const [product, setProduct] = useState([]);

  const handleDisplay = async () => {
    const url = `http://localhost:5001/users/viewBedroomFurniture`;
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(url, config);
    const data = await res.json();
    console.log(data);
    if (res.status !== 200) {
      throw new Error("Couldnt fetch furniture data");
    }
    setProduct([...product, ...data]);
  };
  useEffect(() => {
    handleDisplay();
  }, []);

  return (
    <>
      {product.map((d, i) => {
        return <List index={i} key={d._id} product={d}></List>;
      })}
    </>
  );
};

export default Bedroom;
