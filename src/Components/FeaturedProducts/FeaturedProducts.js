import React from "react";
import "./FeaturedProducts.css";
import FeaturedProductCard from "./FeaturedProductCard";

const FeaturedProducts = (props) => {
  return (
    <React.Fragment>
      <h2 className="section-heading">
        <span className="add-deco">Featured Products</span>
      </h2>
      <div className="product-container">
        {props.products.map((productx, index) => (
          <FeaturedProductCard
            product={productx}
            key={index}
          ></FeaturedProductCard>
        ))}
      </div>
    </React.Fragment>
  );
};
export default FeaturedProducts;
