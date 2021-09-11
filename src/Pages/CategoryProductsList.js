import React, { useCallback, useEffect, useState } from "react";
import "./CategoryProductsList.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CategoryView from "../Components/CategoryView/CategoryView";
import { useParams } from "react-router-dom";
const CategoryProductsList = () => {
  const params = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const fetchCategoryProducts = useCallback(async () => {
    const data = await fetch(
      `https://e-commerce-react-4c934-default-rtdb.firebaseio.com/FeaturedProducts.json?orderBy="category"&equalTo="${params.category}"`
    );
    const requiredData = await data.json();
    const reqCatProds = [];
    const keys = Object.keys(requiredData);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      reqCatProds[i] = requiredData[key];
    }
    console.log(requiredData);
    setCategoryProducts(reqCatProds);
  }, [params.category]);
  useEffect(() => {
    fetchCategoryProducts();
  }, [fetchCategoryProducts]);
  return (
    <React.Fragment>
      <div className="CategoryProductsList__main">
        <div>
          <Navbar></Navbar>
        </div>
        <div className="CategoryProductsList__content">
          {categoryProducts.map((prod, index) => (
            <CategoryView
              url={prod.imgURL}
              title={prod.name}
              key={index}
              id={prod.id}
            ></CategoryView>
          ))}
        </div>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default CategoryProductsList;
