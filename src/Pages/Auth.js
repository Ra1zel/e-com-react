import React from "react";
import LoginForm from "../Components/AuthComponents/LoginForm";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Auth = () => {
  return (
    <div className="wrapper-component">
      <div style={{ width: "100%" }}>
        <Navbar></Navbar>
      </div>
      <LoginForm></LoginForm>
      <Footer></Footer>
    </div>
  );
};

export default Auth;
