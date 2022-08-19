import React, { useEffect, useContext, useState } from "react";
import ReactContext from "../context/react-context";
import OrderList from "./OrderList";

const Order = () => {
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);
  const reactCtx = useContext(ReactContext);

  const fetchUserOrder = async (url, config) => {
    try {
      const url = `/users/viewUserOrder`;
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + reactCtx.token.access,
        },
      };

      const res = await fetch(url, config);
      const data = await res.json();

      if (res.status !== 200 && data.message === "no order found!") {
        throw new Error("Couldnt order");
      }

      setOrder(data[0].order);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };
  console.log(order);
  useEffect(() => {
    fetchUserOrder();
  }, []);

  return (
    <div>
      {order.length === 0 ? (
        <h1>You have no orders yet!</h1>
      ) : (
        <div>
          <h2 className="text-3xl mx-5 my-4 font-cart">Your Orders!</h2>
          <div>
            {order.map((d, i) => {
              return (
                <>
                  <OrderList
                    fetchUserOrder={fetchUserOrder}
                    index={i}
                    id={d._id}
                    order={d}
                  ></OrderList>
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
