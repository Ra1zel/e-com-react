import React, { useCallback, useEffect, useState } from "react";
import CategoryCard from "../Components/CategoryCard/CategoryCard";
import Navbar from "../Components/Navbar";
import "./BrowseProducts.css";
const BrowseProducts = (props) => {
  const [productCategories, setProductCategories] = useState([]);
  const fetchCategoriesHandler = useCallback(async () => {
    const data = await fetch(
      "https://e-commerce-react-4c934-default-rtdb.firebaseio.com/Categories.json"
    );
    const parsedData = await data.json();
    setProductCategories(parsedData);
  }, []);
  useEffect(() => {
    fetchCategoriesHandler();
  }, [fetchCategoriesHandler]);
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <h2 className="section-heading">
        <span className="add-deco">Categories</span>
      </h2>
      <div className="categories-card-container">
        {productCategories.map((productCategory, index) => (
          <CategoryCard
            categoryImg={productCategory.cat_URL}
            categoryName={productCategory.name}
            key={index}
          ></CategoryCard>
        ))}
      </div>
    </React.Fragment>
  );
};

export default BrowseProducts;
