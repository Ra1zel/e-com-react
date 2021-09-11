import React from "react";
import { useHistory } from "react-router-dom";
import "./FeaturedProductCard";
import "./FeaturedProductCard.css";
const FeaturedProductCard = (props) => {
  const id = props.product.id;
  const history = useHistory();
  const btnClickHandler = () => {
    let path = "";
    path = `/product/${id}`;
    history.push(path);
  };
  return (
    <React.Fragment>
      <div className="product-card">
        <div className="product-card__img-container">
          <img
            src={props.product.imgURL}
            alt="iPhone 12"
            className="product-card__img"
          ></img>
        </div>
        <div className="product-card__copy">
          <h4>{props.product.name}</h4>
          <p>Price: PKR {props.product.price}</p>
          <p>
            {props.product.avaliability === true ? "In Stock" : "Out Of Stock"}
          </p>
        </div>
        <button className="product-card__action-btn" onClick={btnClickHandler}>
          Buy Now
        </button>
      </div>
    </React.Fragment>
  );
};
export default FeaturedProductCard;
