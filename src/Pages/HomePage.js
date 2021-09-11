import React from "react";
import { useState, useCallback, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Carousel from "../Components/Carousel/Carousel";
import FeaturedProducts from "../Components/FeaturedProducts/FeaturedProducts";
import "../App.css";
//---------------------------------------------------
import carouselImg1 from "../new_5.jpg";
import carouselImg2 from "../azt1.jpeg";
import carouselImg3 from "../azt2.jpeg";
//---------------------------------------------------
let requiredCarouselData = [];
const Images = [carouselImg1, carouselImg2, carouselImg3];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [, setCarouselImages] = useState([]);
  const fetchFeaturedProducts = useCallback(async () => {
    const data = await fetch(
      "https://e-commerce-react-4c934-default-rtdb.firebaseio.com/FeaturedProducts.json"
    );
    const requiredProductData = await data.json();
    const reqPD = [];
    const keys = Object.keys(requiredProductData);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      reqPD[i] = requiredProductData[key];
    }
    setFeaturedProducts(reqPD);
  }, []);

  const fetchCarouselImages = useCallback(async () => {
    const data = await fetch(
      "https://e-commerce-react-4c934-default-rtdb.firebaseio.com/CarouselImages.json"
    );
    const CarouselData = await data.json();

    CarouselData.map((data) => requiredCarouselData.push(data.imgURL0));
    setCarouselImages(requiredCarouselData);
  }, []);
  useEffect(() => {
    fetchCarouselImages();
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts, fetchCarouselImages]);
  return (
    <div className="main-content">
      <div>
        <Navbar></Navbar>
        <Carousel CarouselImages={Images}></Carousel>
      </div>
      <FeaturedProducts products={featuredProducts}></FeaturedProducts>
      <section className="categories"></section>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
