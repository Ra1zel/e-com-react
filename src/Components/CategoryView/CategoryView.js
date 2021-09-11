import React from "react";
import "./CategoryView.css";
import nextIcon from "../../forwardArrow.svg";
import { useHistory } from "react-router-dom";
const CategoryView = (props) => {
  const history = useHistory();
  const clickHandler = () => {
    history.push(`/product/${props.id}`);
  };
  return (
    <div className="CategoryProductsList__card" onClick={clickHandler}>
      <div className="CategoryProductsList__image">
        <img src={props.url} alt="random click"></img>
      </div>
      <div className="CategoryProductsList__text">
        <span className="CategoryProductsList__text-h4">{props.title}</span>
      </div>
      <div className="CategoryProductList__icon">
        <img src={nextIcon} alt="next symbol"></img>
      </div>
    </div>
  );
};

export default CategoryView;
