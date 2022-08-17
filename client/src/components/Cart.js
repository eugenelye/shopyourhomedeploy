import React, { useContext, useState, useEffect } from "react";
import Topbar from "./Topbar";
import CartList from "./CartList";
import ReactContext from "../context/react-context";

const Cart = () => {
  const [furniture, setFurniture] = useState([]);
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);
  const reactCtx = useContext(ReactContext);

  const fetchUserFuniture = async (url, config) => {
    try {
      const url = `http://localhost:5001/users/viewUserFurniture`;
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + reactCtx.token.access,
        },
      };

      const res = await fetch(url, config);
      const data = await res.json();

      if (res.status !== 200 && data.message === "no furniture found!") {
        throw new Error("no furniture");
        // setFurniture([]);
      }

      setFurniture(data[0].furniture);
    } catch (err) {
      setError(err.message);
      console.log(err);

      if ((err = "no furniture")) {
        setFurniture([]);
      }
    }
  };

  useEffect(() => {
    fetchUserFuniture();
  }, []);

  let sum = 0;

  furniture.forEach((element) => {
    sum += element.price;
  });

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = dd + "-" + mm + "-" + yyyy;
  console.log(today);
  console.log(furniture);

  const addOrder = async (e) => {
    e.preventDefault();

    const data = {
      date: today,
      furniture: furniture,
      price: sum,
    };

    const url = "http://localhost:5001/users/addOrder";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + reactCtx.token.access,
      },
    });
    console.log(res.message);

    const order = await res.json();
    if (order.status === "error") {
      alert(`${order.message}`);
    } else if (order.status === "ok") {
      console.log(`${order.message}`);
    }
    fetchUserFuniture();
  };

  return (
    <div>
      {furniture.length === 0 ? (
        <h1 className="text-4xl mx-5 my-4 font-roboto">Your cart is empty!</h1>
      ) : (
        <div>
          <h2 className="text-3xl mx-5 my-4 font-cart">Your Cart</h2>
          <div className="border-2 border-black rounded-lg mx-5 my-10 w-5/12">
            <table className="table-auto">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {furniture.map((d, i) => {
                  return (
                    <>
                      <CartList
                        fetchUserFuniture={fetchUserFuniture}
                        index={i}
                        id={d._id}
                        furniture={d}
                      ></CartList>
                    </>
                  );
                })}
              </tbody>
            </table>
            <div className="my-5 mx-4">
              <span className="inline-block font-bold ">Total:</span>${sum}
            </div>
            <button
              className="relative right-0 bg-black mx-2 my-2 w-24 h-8 text-md text-white font-semibold rounded-full border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
              onClick={addOrder}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
