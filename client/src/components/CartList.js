import React, { useContext } from "react";
import ReactContext from "../context/react-context";

const CartList = (props) => {
  const reactCtx = useContext(ReactContext);

  const handleSubmitDelete = async (e) => {
    const data = {
      furnitureId: props.furniture._id,
    };
    const url = "/users/deleteFurniture";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + reactCtx.token.access,
      },
    });

    const deleteData = await res.json();

    if (deleteData.status === "error") {
      console.log(`this is the ${deleteData}`);
      return alert(`deleteData not found`);
    }
    props.fetchUserFuniture();
  };

  return (
    <>
      <tr>
        <td className="w-12 h-12">
          <img src={props.furniture.image}></img>
        </td>
        <td className="text-base font-name">{props.furniture.name}</td>
        <td className="text-base">${props.furniture.price}</td>
        <td onClick={handleSubmitDelete}>
          <button className="bg-yellow-300 mx-2 w-24 h-8 text-md text-plumish font-semibold rounded-full border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartList;
