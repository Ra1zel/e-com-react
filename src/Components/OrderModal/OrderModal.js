import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import OrderContext from "../../store/Order-context";
import "./OrderModal.css";
const OrderModal = (props) => {
  let classes = null;
  if (props.state === "entering") {
    classes = "ModalOpen";
  } else if (props.state === "exiting") {
    classes = "ModalClosed";
  } else {
    classes = null;
  }
  const [Quantity, setQuantity] = useState(1);
  const history = useHistory();
  const orderCtx = useContext(OrderContext);
  const params = useParams();
  const decQtyHandler = () => {
    setQuantity((prevState) => {
      if (prevState === 1) {
        return prevState;
      } else {
        return prevState - 1;
      }
    });
  };

  const incQtyHandler = () => {
    setQuantity((prevState) => {
      if (prevState === 5) {
        return prevState;
      } else {
        return prevState + 1;
      }
    });
  };
  const checkoutHandler = () => {
    orderCtx.updateProdInfo(
      params.productId,
      props.title,
      Quantity,
      Quantity * props.price
    );
    history.push("/checkout");
  };
  return (
    <div className={`modal-wrapper ${classes}`}>
      <div className="modal-content-container">
        <h4 className="modal-title">{props.title}</h4>
        <p className="modal-content">Quantity: {Quantity}</p>
        <div className="modal-qty-btn-container">
          <button
            className="modal-qty-btn"
            onClick={decQtyHandler}
            disabled={Quantity === 1 ? true : false}
          >
            -
          </button>
          <button
            className="modal-qty-btn"
            onClick={incQtyHandler}
            disabled={Quantity === 5 ? true : false}
          >
            +
          </button>
        </div>
        <p className="modal-content">Total Price: {props.price * Quantity}</p>
        <button className="modal-action-btn" onClick={checkoutHandler}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
