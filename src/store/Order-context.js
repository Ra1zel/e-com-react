import React, { useState } from "react";
const OrderContext = React.createContext({
  productId: "",
  name: "",
  quantity: 0,
  totalPrice: 0,
  updateProdInfo: () => {},
});

export const OrderContextProvider = (props) => {
  const [OrderInfo, setOrderInfo] = useState({
    id: "",
    name: "",
    qty: 0,
    price: 0,
  });
  const prodInfoHandler = (id, name, qty, price) => {
    setOrderInfo((prevState) => {
      return { ...prevState, id: id, name: name, qty: qty, price: price };
    });
  };
  const contextValue = {
    id: OrderInfo.id,
    name: OrderInfo.name,
    quantity: OrderInfo.qty,
    totalPrice: OrderInfo.price,
    updateProdInfo: prodInfoHandler,
  };
  return (
    <OrderContext.Provider value={contextValue}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
