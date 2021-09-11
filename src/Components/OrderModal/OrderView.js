import React from "react";
import "./OrderView.css";

const OrderView = (props) => {
  const btnClickHandler = () => {
    const url = `https://e-commerce-react-4c934-default-rtdb.firebaseio.com/Orders/${props.addInfo}.json`;
    props.deleteHandler(url);
  };
  return (
    <React.Fragment>
      <div className="order-view-container">
        <div className="order-view-copy">
          <p className="order-view-title">{props.order.productName}</p>
          <p className="order-view-text">
            &times;{props.order.quantity} &mdash; PKR {props.order.orderPrice}
          </p>
          <button className="order-view-button" onClick={btnClickHandler}>
            Cancel
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderView;
