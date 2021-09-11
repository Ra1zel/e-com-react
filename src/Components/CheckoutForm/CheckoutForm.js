import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/Auth-Context";
import OrderContext from "../../store/Order-context";
import "./CheckoutForm.css";

let finalClassName = "";
let finalClassNumber = "";
let finalClassAddress1 = "";
let finalClassAddress2 = "";
let finalClassCity = "";

const checkValidity = (textTovalidate) => {
  return textTovalidate.length >= 7 ? true : false;
};
const CheckoutForm = () => {
  const [enteredName, setEnteredName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [enteredNumber, setEnteredNumber] = useState("");
  const [numberIsValid, setNumberIsValid] = useState(false);
  const [numberIsTouched, setNumberIsTouched] = useState(false);
  const [enteredAddress1, setEnteredAddress1] = useState("");
  const [address1IsValid, setAddress1IsValid] = useState(false);
  const [address1IsTouched, setAddress1IsTouched] = useState(false);
  const [enteredAddress2, setEnteredAddress2] = useState("");
  const [address2IsValid, setAddress2IsValid] = useState(false);
  const [enteredCity, setEnteredCity] = useState("");
  const [cityIsValid, setCityIsValid] = useState(false);
  const [cityIsTouched, setCityIsTouched] = useState(false);
  const history = useHistory();
  const orderCtx = useContext(OrderContext);
  const authCtx = useContext(AuthContext);
  const nameChangeHandler = (e) => {
    const text = e.target.value.trim();
    const isValid = checkValidity(text);
    if (isValid) {
      setEnteredName(text);
    }
    setNameIsValid(isValid);
  };
  const numberChangeHandler = (e) => {
    const text = e.target.value.trim();
    const isValid = checkValidity(text);
    if (isValid) {
      setEnteredNumber(text);
    }
    setNumberIsValid(isValid);
  };
  const address1ChangeHandler = (e) => {
    const text = e.target.value.trim();
    const isValid = checkValidity(text);
    if (isValid) {
      setEnteredAddress1(text);
    }
    setAddress1IsValid(isValid);
  };
  const address2ChangeHandler = (e) => {
    const text = e.target.value.trim();
    const isValid = checkValidity(text);
    if (isValid) {
      setEnteredAddress2(text);
    }
    setAddress2IsValid(isValid);
  };
  const cityChangeHandler = (e) => {
    const text = e.target.value.trim();
    const isValid = checkValidity(text);
    if (isValid) {
      setEnteredCity(text);
    }
    setCityIsValid(isValid);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    placeOrder();
    console.log("order placed");
    history.replace("/");
  };
  const nameFocusHandler = () => {
    setNameIsTouched(true);
  };
  const numberFocusHandler = () => {
    setNumberIsTouched(true);
  };
  const address1FocusHandler = () => {
    setAddress1IsTouched(true);
  };
  const cityFocusHandler = () => {
    setCityIsTouched(true);
  };
  if (nameIsTouched === false) {
    finalClassName = "";
  } else {
    if (nameIsValid) {
      finalClassName = "form-input-valid";
    } else {
      finalClassName = "form-input-invalid";
    }
  }

  if (numberIsTouched === false) {
    finalClassNumber = "";
  } else {
    if (numberIsValid) {
      finalClassNumber = "form-input-valid";
    } else {
      finalClassNumber = "form-input-invalid";
    }
  }

  if (address1IsTouched === false) {
    finalClassAddress1 = "";
  } else {
    if (address1IsValid) {
      finalClassAddress1 = "form-input-valid";
    } else {
      finalClassAddress1 = "form-input-invalid";
    }
  }

  if (cityIsTouched === false) {
    finalClassCity = "";
  } else {
    if (cityIsValid) {
      finalClassCity = "form-input-valid";
    } else {
      finalClassCity = "form-input-invalid";
    }
  }
  const placeOrder = async () => {
    await fetch(
      "https://e-commerce-react-4c934-default-rtdb.firebaseio.com/Orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userEmail: authCtx.email,
          userName: enteredName,
          deliveryAddressMain: enteredAddress1,
          deliveryAddressSecondary: enteredAddress2,
          userContactNumber: enteredNumber,
          userCity: enteredCity,
          productName: orderCtx.name,
          orderId: Math.random() * 10000,
          quantity: orderCtx.quantity,
          orderPrice: orderCtx.totalPrice,
        }),
      }
    );
  };
  return (
    <div className="checkoutForm-main">
      <div>
        <h2 className="checkoutForm-heading">CheckOut</h2>
        <form className="checkoutForm" onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="Name"
            className={`form-input ${finalClassName}`}
            onChange={nameChangeHandler}
            onFocus={nameFocusHandler}
          ></input>
          <input
            type="text"
            placeholder="Contact Number"
            className={`form-input ${finalClassNumber}`}
            onChange={numberChangeHandler}
            onFocus={numberFocusHandler}
          ></input>
          <input
            type="text"
            placeholder="Address Line 1"
            className={`form-input ${finalClassAddress1}`}
            onChange={address1ChangeHandler}
            onFocus={address1FocusHandler}
          ></input>
          <input
            type="text"
            placeholder="Address Line 2 (optional)"
            className={`form-input`}
            onChange={address2ChangeHandler}
            // onFocus={address2FocusHandler}
          ></input>
          <input
            type="text"
            placeholder="City"
            className={`form-input ${finalClassCity}`}
            onChange={cityChangeHandler}
            onFocus={cityFocusHandler}
          ></input>
          <div className="checkout-order">
            <h2 className="checkoutForm-heading">Order Summary</h2>
            <div className="helper-div">
              <h4 className="summary__heading">{orderCtx.name}</h4>
              <p className="summary__text">Quantity: {orderCtx.quantity}</p>
              <p className="summary__text">
                Total Price: {orderCtx.totalPrice}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="checkout-button"
            disabled={
              nameIsValid &&
              numberIsValid &&
              address1IsValid &&
              cityIsValid === true
                ? false
                : true
            }
          >
            Order
          </button>
        </form>
      </div>
    </div>
  );
};
export default CheckoutForm;
