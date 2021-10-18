import React, {useEffect, useRef} from "react";
import {useStateWithCallbackLazy} from "use-state-with-callback";
import {useState} from "react";
import "./Carousel.css";
// img/icon imports
//-----------------------------
import nextIcon from "../../next.svg";
import prevIcon from "../../previous.svg";
//-----------------------------

//GLOBAL VARIABLES------
let __slides = [];
//------------------------

const Carousel = (props) => {
    const [firstSlide, secondSlide, lastSlide] = props.CarouselImages;
    const slidesArray1 = [lastSlide, firstSlide, secondSlide];
    const slidesArray2 = [secondSlide, lastSlide, firstSlide];
    const ArrayLength = props.CarouselImages.length;
    let translateString = "";
    //REFS
    const nextSlideBtnRef = useRef();
    const prevSlideBtnRef = useRef();
    const timerRef = useRef();
    //------------------
    //States
    const [currentIndex, setCurrentIndex] = useState({
        index: 1,
        whichArr: 0,
        transitionTime: 0.3,
    });
    const [, setMoveInstantly] = useStateWithCallbackLazy(0);
    const [isCarouselHover, setIsCarouselHover] = useState(false);
    //-------------------

    const slideMovementUtilFuncForward = () => {
        setCurrentIndex((prevState) => {
            if (prevState.index === ArrayLength - 1) {
                setMoveInstantly(1, (currentState) => {
                    if (currentState === 1) {
                        nextSlideBtnRef.current.click();
                    }
                });
                if (Number(prevState.whichArr) === 0) {
                    return {
                        ...prevState,
                        index: 0,
                        whichArr: !prevState.whichArr,
                        transitionTime: 0,
                    };
                } else {
                    return {
                        ...prevState,
                        index: 1,
                        whichArr: !prevState.whichArr,
                        transitionTime: 0,
                    };
                }
            } else {
                setMoveInstantly(0, (currentState) => {
                    if (currentState === 1) {
                        nextSlideBtnRef.current.click();
                    }
                });
                return {
                    ...prevState,
                    index: prevState.index + 1,
                    transitionTime: 0.3,
                };
            }
        });
    };

    const carouselNavBtnHandler = () => {};
    const slideMovementUtilFuncBackward = () => {
        setCurrentIndex((prevState) => {
            if (prevState.index === 0) {
                setMoveInstantly(1, (currentState) => {
                    if (currentState === 1) {
                        prevSlideBtnRef.current.click();
                    }
                });
                if (Number(prevState.whichArr) === 0) {
                    return {
                        ...prevState,
                        index: 1,
                        whichArr: !prevState.whichArr,
                        transitionTime: 0,
                    };
                } else {
                    return {
                        ...prevState,
                        index: 2,
                        whichArr: !prevState.whichArr,
                        transitionTime: 0,
                    };
                }
            } else {
                setMoveInstantly(0, (currentState) => {
                    if (currentState === 1) {
                        prevSlideBtnRef.current.click();
                    }
                });
                return {
                    ...prevState,
                    index: prevState.index - 1,
                    transitionTime: 0.3,
                };
            }
        });
    };

    const goToPrevSlideHandler = () => {
        slideMovementUtilFuncBackward();
    };
    const goToNextSlideHandler = () => {
        slideMovementUtilFuncForward();
    };

    const mouseOverHandler = () => {
        setIsCarouselHover(true);
    };
    const mouseOutHandler = () => {
        setIsCarouselHover(false);
    };

    useEffect(() => {
        if (!isCarouselHover) {
            timerRef.current = setInterval(() => {
                setCurrentIndex((prevState) => {
                    if (prevState.index === ArrayLength - 1) {
                        if (Number(prevState.whichArr) === 0) {
                            return {
                                ...prevState,
                                index: 0,
                                whichArr: !prevState.whichArr,
                                transitionTime: 0,
                            };
                        } else {
                            return {
                                ...prevState,
                                index: 1,
                                whichArr: !prevState.whichArr,
                                transitionTime: 0,
                            };
                        }
                    } else {
                        return {
                            ...prevState,
                            index: prevState.index + 1,
                            transitionTime: 0.3,
                        };
                    }
                });
            }, 3000);
        }
    }, [ArrayLength, isCarouselHover]);

    useEffect(() => {
        if (isCarouselHover) {
            clearTimeout(timerRef.current);
        }
    }, [isCarouselHover]);

    if (Number(currentIndex.whichArr) === 0) {
        __slides = slidesArray1;
    } else {
        __slides = slidesArray2;
    }
    translateString = `translateX(${-currentIndex.index * window.innerWidth}px)`;

    return (
        <div className="carousel">
            <button
                ref={prevSlideBtnRef}
                className="carousel__prev-btn"
                onMouseEnter={mouseOverHandler}
                onMouseLeave={mouseOutHandler}
                onClick={goToPrevSlideHandler}
            >
                <div className="icon-helper-div">
                    <img src={prevIcon} alt="previous-icon"></img>
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
                        transition: `transform ${currentIndex.transitionTime}s ease-in-out`,
                    }}
                >
                    {__slides.map((image, index) => (
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
                ref={nextSlideBtnRef}
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
                    onMouseEnter={mouseOverHandler}
                    onMouseLeave={mouseOutHandler}
                    id={
                        (currentIndex.index === 1 && Number(currentIndex.whichArr) === 0) ||
                            (currentIndex.index === 2 && Number(currentIndex.whichArr) === 1)
                            ? "selected-nav-btn"
                            : ""
                    }
                ></button>
                <button
                    className="carousel__bottom-nav-btn"
                    onMouseEnter={mouseOverHandler}
                    onMouseLeave={mouseOutHandler}
                    id={
                        (currentIndex.index === 2 && Number(currentIndex.whichArr) === 0) ||
                            (currentIndex.index === 0 && Number(currentIndex.whichArr) === 1)
                            ? "selected-nav-btn"
                            : ""
                    }
                ></button>
                <button
                    className="carousel__bottom-nav-btn"
                    onMouseEnter={mouseOverHandler}
                    onMouseLeave={mouseOutHandler}
                    onClick={carouselNavBtnHandler}
                    id={
                        (currentIndex.index === 1 && Number(currentIndex.whichArr) === 1) ||
                            (currentIndex.index === 0 && Number(currentIndex.whichArr) === 0)
                            ? "selected-nav-btn"
                            : ""
                    }
                ></button>
            </div>
        </div>
    );
};

export default Carousel;
