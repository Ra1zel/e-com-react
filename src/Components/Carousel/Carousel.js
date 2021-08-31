import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./Carousel.css";
// img/icon imports
//-----------------------------
import nextIcon from "../../next.svg";
import prevIcon from "../../previous.svg";
//-----------------------------
const Carousel = (props) => {
  const transitionTime = 0.35;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselHover, setIsCarouselHover] = useState(false);
  const ArrayLength = props.CarouselImages.length;
  let translateString = "";

  const goToPrevSlideHandler = () => {
    setCurrentIndex((prevState) => {
      if (prevState === 0) {
        return ArrayLength - 1;
      } else {
        return prevState - 1;
      }
    });
  };

  const goToNextSlideHandler = () => {
    setCurrentIndex((prevState) => {
      if (prevState === ArrayLength - 1) {
        return 0;
      } else {
        return prevState + 1;
      }
    });
  };
  const mouseOverHandler = () => {
    setIsCarouselHover(true);
    console.log("this was hit!");
  };
  const mouseOutHandler = () => {
    setIsCarouselHover(false);
    console.log("this was also hit!");
  };
  const timerRef = useRef();
  useEffect(() => {
    if (!isCarouselHover) {
      console.log("nvm");
      timerRef.current = setInterval(() => {
        console.log("hi");
        setCurrentIndex((prevState) => {
          if (prevState === ArrayLength - 1) {
            return 0;
          } else {
            return prevState + 1;
          }
        });
      }, 3000);
    }
  }, [ArrayLength, isCarouselHover]);

  useEffect(() => {
    if (isCarouselHover) {
      console.log("yay");
      clearTimeout(timerRef.current);
      console.log("yippy");
    }
  }, [isCarouselHover]);
  translateString = `translateX(${-currentIndex * window.innerWidth}px)`;

  return (
    <div className="carousel">
      <button
        className="carousel__prev-btn"
        onMouseEnter={mouseOverHandler}
        onMouseLeave={mouseOutHandler}
      >
        <div className="icon-helper-div">
          <img
            src={prevIcon}
            alt="previous-icon"
            onClick={goToPrevSlideHandler}
          ></img>
        </div>
      </button>
      <div
        className="carousel__track-container"
        onMouseEnter={mouseOverHandler}
        onMouseLeave={mouseOutHandler}
      >
        <ul
          className="carousel__track"
          style={{
            width: `${window.innerWidth * ArrayLength}px`,
            transform: translateString,
            transition: `transform ${transitionTime}s ease-in-out`,
          }}
        >
          {props.CarouselImages.map((image, index) => (
            <li className="carousel__slide" key={index}>
              <img
                className="carousel__slide-img slide-change"
                src={image}
                alt="laptop"
              ></img>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="carousel__next-btn"
        onClick={goToNextSlideHandler}
        onMouseEnter={mouseOverHandler}
        onMouseLeave={mouseOutHandler}
      >
        <div className="icon-helper-div">
          <img src={nextIcon} alt="next-icon"></img>
        </div>
      </button>
      <div className="carousel__bottom-nav">
        <button
          className="carousel__bottom-nav-btn "
          id="selected-nav-btn"
        ></button>
        <button className="carousel__bottom-nav-btn"></button>
        <button className="carousel__bottom-nav-btn"></button>
      </div>
    </div>
  );
};

export default Carousel;
