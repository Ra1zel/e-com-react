import React, { useCallback, useContext, useEffect, useState } from "react";
import CancelModal from "../Components/CancelModal/CancelModal";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import OrderView from "../Components/OrderModal/OrderView";
import AuthContext from "../store/Auth-Context";
import Transition from "react-transition-group/Transition";
import "./Orders.css";
let keys = [];
let requiredURL = "";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const fetchOrders = useCallback(async () => {
    const data = await fetch(
      `https://e-commerce-react-4c934-default-rtdb.firebaseio.com/Orders.json?orderBy="userEmail"&equalTo="${authCtx.email}"`
    );
    const requiredData = await data.json();
    const reqOrders = [];
    keys = Object.keys(requiredData);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      reqOrders[i] = requiredData[key];
    }
    setOrders(reqOrders);
  }, [authCtx.email]);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const deleteOrder = (url) => {
    requiredURL = url;
    setShowModal(true);
  };
  const backdropHandler = () => {
    setShowModal(false);
  };
  const actualNoHandler = () => {
    setShowModal(false);
  };
  const actualYesHandler = () => {
    setShowModal(false);
    setIsLoading(true);
    fetch(requiredURL, {
      method: "DELETE",
    }).then(() => {
      fetchOrders().then(() => {
        setIsLoading(false);
      });
    });
  };
  return (
    <React.Fragment>
      <div className="orders-main">
        <div>
          <Transition
            mountOnEnter
            unmountOnExit
            in={showModal}
            timeout={{ enter: 0, exit: 200 }}
          >
            {(state) => (
              <div
                className="backdrop-modal"
                onClick={backdropHandler}
                style={{
                  opacity: state === "exiting" || state === "entering" ? 0 : 1,
                  transition: "opacity 0.2s linear",
                }}
              ></div>
            )}
          </Transition>
          <Transition mountOnEnter unmountOnExit in={showModal} timeout={200}>
            {(state) => (
              <CancelModal
                no={actualNoHandler}
                yes={actualYesHandler}
                state={state}
              ></CancelModal>
            )}
          </Transition>
        </div>
        <div className="orders-wrapper">
          <div>
            <Navbar></Navbar>
          </div>
          {!isLoading &&
            orders.map((order, index) => (
              <OrderView
                order={order}
                key={index}
                addInfo={keys[index]}
                deleteHandler={deleteOrder}
              ></OrderView>
            ))}
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Orders;
