import React from "react";

const OrderList = (props) => {
  const order = props.order;
  return (
    <>
      <div className="inline-block w-3/4 h-3/4 border-2 border-black mx-5 my-5 rounded-lg">
        <div className="mx-4 my-4 text-xl">Date ordered: {order.date}</div>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="w-20"></th>
              <th className="w-20"></th>
              <th className="w-20"></th>
            </tr>
          </thead>
          <tbody>
            {order.furniture.map((d, i) => {
              return (
                <tr>
                  <td className="w-12 h-12">
                    <img src={d.image}></img>
                  </td>
                  <td className="text-base font-name w-96">{d.name}</td>
                  <td className="text-base">${d.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mx-4 my-4">
          <span className="font-bold">Total:</span>${order.price}
        </div>
      </div>
    </>
  );
};

export default OrderList;
