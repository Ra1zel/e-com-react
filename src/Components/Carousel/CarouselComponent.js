import React from "react";
import "./CarouselComponent.css";
import iphone from "../../headphones.jpg";
import arrow from "../../DownArrow.svg";
const CarouselComponent = () => {
  const btnClickHandler = () => {
    alert("this button was clicked!!");
  };

  return (
    <div className="temp-row">
      <div className="carousel-component__card">
        <div className="carousel-component__img-container">
          <img src={iphone} alt="iphone 12"></img>
        </div>
        <p className="carousel-component__card-name">Sony XM5</p>
        <p className="carousel-component__card-price">&#36; 250000</p>
        <button
          className="carousel-component__card-btn1"
          onClick={btnClickHandler}
        >
          <img src={arrow} alt="symbol to view details"></img>
        </button>
      </div>{" "}
      <div className="carousel-component__card">
        <div className="carousel-component__img-container">
          <img src={iphone} alt="iphone 12"></img>
        </div>
        <p className="carousel-component__card-name">Sony XM5</p>
        <p className="carousel-component__card-price">&#36; 250000</p>
        <button
          className="carousel-component__card-btn1"
          onClick={btnClickHandler}
        >
          <img src={arrow} alt="symbol to view details"></img>
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;
