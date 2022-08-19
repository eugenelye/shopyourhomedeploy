import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Icon } from "@iconify/react";
import styles from "./modal.module.css";
import ReactContext from "../context/react-context";

const ProductModal = (props) => {
  const reactCtx = useContext(ReactContext);

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
      return alert("Error! Please ensure Name and DOB is filled in");
    }

    const url = "/users/addFurniture";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + reactCtx.token.access,
      },
    });
    const addFurniture = await res.json();

    if (addFurniture.status === "error") {
      alert(`${addFurniture.message}`);
    } else if (addFurniture.status === "ok") {
      console.log(`${addFurniture.message}`);
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className="h-1/2 w-2/3 bg-white fixed left-52 top-24 rounded-lg">
            <img
              src={props.product.image}
              alt=""
              className="h-60 w-80 absolute top-4 left-10"
            ></img>
            <h2 className="font-serif text-3xl absolute top-10 left-1/2">
              {props.product.name}
            </h2>
            <p className="absolute left-1/2 top-40">${props.product.price}</p>
            <p className="absolute left-1/2 top-52 w-1/2 text-xs ">
              {props.product.description}
            </p>
            <button
              onClick={addFurniture}
              className="text-xs border-2 border-black  w-32 h-12 absolute bottom-5 right-1/4"
            >
              ADD TO CART{" "}
              <Icon icon="bi:cart-check" className="absolute right-1/2" />
            </button>
            <button
              onClick={props.showProductModal}
              className="text-xs border-2 border-black  w-32 h-12 absolute bottom-5 right-5"
            >
              Close
              <Icon
                icon="ant-design:close-circle-outlined"
                className="absolute left-12"
              />
            </button>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ProductModal;
