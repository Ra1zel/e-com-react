import React from "react";
import "./CheckOut.css";
import CheckoutForm from "../Components/CheckoutForm/CheckoutForm";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const CheckOut = () => {
  return (
    <React.Fragment>
      <div className="checkout-main">
        <div>
          <Navbar></Navbar>
        </div>
        <div className="checkout-form-pos">
          <CheckoutForm></CheckoutForm>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </React.Fragment>
  );
};
export default CheckOut;
