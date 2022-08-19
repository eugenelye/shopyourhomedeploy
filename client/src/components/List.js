import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import ProductModal from "./ProductModal";
import ReactContext from "../context/react-context";

const List = (props) => {
  const [productModal, setProductModal] = useState(false);
  const reactCtx = useContext(ReactContext);

  const showProductModal = () => {
    setProductModal(!productModal);
  };

  const addFurniture = async (e) => {
    e.preventDefault();
    console.log(reactCtx.access);

    const data = {
      name: props.product.name,
      image: props.product.image,
      description: props.product.description,
      price: props.product.price,
    };

    if (props.product.name === "") {
      return alert("Error! Please add the furniture correctly");
    }

    const url = "/users/addFurniture";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + reactCtx.token?.access,
      },
    });
    const addFurniture = await res.json();
    alert(`item added`);
    console.log(addFurniture);

    if (addFurniture.status === "error") {
      alert(`${addFurniture.message}`);
    } else if (addFurniture.status === "ok") {
      console.log(`${addFurniture.message}`);
    }
  };

  return (
    <>
      <div className="border-2 border-black inline-block align-middle rounded-lg w-80 h-64 drop-shadow-2xl opacity-75 p-5 m-10 text-center hover:opacity-100">
        <img
          onClick={showProductModal}
          src={props.product.image}
          alt=""
          className="box-border h-32 w-52 inline-block align-middle"
        ></img>
        <div className="text-base font-mono">{props.product.name}</div>
        <div className='="text-xs'>${props.product.price}</div>
        <button onClick={addFurniture}>
          <Icon
            icon="bi:cart-check"
            className="inline-block align-middle w-5 h-5"
          />
        </button>
      </div>
      {productModal && (
        <ProductModal
          product={props.product}
          showProductModal={showProductModal}
        ></ProductModal>
      )}
    </>
  );
};

export default List;
