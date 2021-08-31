import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Carousel from "./Components/Carousel/Carousel";
import "./App.css";
import CarouselComponent from "./Components/Carousel/CarouselComponent";

//---------------------------------------------------
import carouselImg1 from "./carousel_img1.jpg";
import carouselImg2 from "./carousel_img2.jpg";
import carouselImg3 from "./carousel_img3.jpg";
//---------------------------------------------------

const Images = [carouselImg1, carouselImg2, carouselImg3];
function App() {
  return (
    <React.Fragment>
      <div className="main-content">
        <Navbar></Navbar>
        <Carousel CarouselImages={Images}></Carousel>
        <div className="temp">Categories</div>
        <CarouselComponent></CarouselComponent>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
}

export default App;
