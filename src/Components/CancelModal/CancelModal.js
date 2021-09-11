import React from "react";
import "./CancelModal.css";
const CancelModal = (props) => {
  let classes = null;
  if (props.state === "entering") {
    classes = "ModalOpenOrder";
  } else if (props.state === "exiting") {
    classes = "ModalClosedOrder";
  } else {
    classes = null;
  }
  const noClickHandler = () => {
    props.no();
  };
  const yesClickHandler = () => {
    props.yes();
  };
  return (
    <div className={`cancel-modal-wrapper ${classes}`}>
      <div className="cancel-modal-content-container">
        <p className="cancel-modal-content">
          Are you sure you want to cancel this order ?
        </p>
        <div className="cancel-btn-container">
          <button className="cancel-modal-action-btn" onClick={noClickHandler}>
            No
          </button>
          <button className="cancel-modal-action-btn" onClick={yesClickHandler}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
export default CancelModal;
