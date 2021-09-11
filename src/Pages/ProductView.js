import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import OrderModal from "../Components/OrderModal/OrderModal";
import AuthContext from "../store/Auth-Context";
import Transition from "react-transition-group/Transition";
import "./ProductView.css";
const ProductView = (props) => {
  const [requiredProductData, setRequiredProductData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    const data = await fetch(
      `https://e-commerce-react-4c934-default-rtdb.firebaseio.com/FeaturedProducts.json?orderBy="$key"&equalTo="${params.productId}"&print=pretty`
    );
    const reqData = await data.json();
    setRequiredProductData(reqData[params.productId]);
    setIsLoading(false);
  }, [params.productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  const orderNowHandler = () => {
    if (authCtx.isLoggedin === true) {
      setShowCheckout(true);
    } else {
      history.push("/auth");
    }
  };
  const backdropClickHandler = () => {
    setShowCheckout(false);
  };
  return (
    <React.Fragment>
      <Transition
        mountOnEnter
        unmountOnExit
        in={showCheckout}
        timeout={{ enter: 0, exit: 200 }}
      >
        {(state) => (
          <div
            style={{
              opacity: state === "exiting" || state === "entering" ? 0 : 1,
              transition: "opacity 0.2s linear",
            }}
          >
            <div
              className="backdrop-modal"
              onClick={backdropClickHandler}
            ></div>
          </div>
        )}
      </Transition>
      <Transition mountOnEnter unmountOnExit in={showCheckout} timeout={200}>
        {(state) => (
          <OrderModal
            title={requiredProductData.name}
            price={requiredProductData.price}
            state={state}
          ></OrderModal>
        )}
      </Transition>
      <Navbar></Navbar>
      <div className="productView__main">
        {isLoading === false && (
          <div className="productView__content">
            <div className="productView__card">
              <div className="productView__text">
                <h4 className="productView__text-h4">
                  {requiredProductData.name}
                </h4>
                <p className="productView__text-p">
                  Price: PKR {requiredProductData.price}
                </p>
                <p className="productView__text-p">
                  {requiredProductData.avaliability === true
                    ? "In Stock"
                    : "Out of Stock"}
                </p>
                <button
                  className="productView__button"
                  onClick={orderNowHandler}
                  disabled={
                    requiredProductData.avaliability === false ? true : false
                  }
                >
                  Order Now
                </button>
              </div>
              <div className="productView__image">
                <img src={requiredProductData.imgURL} alt="random click"></img>
              </div>
            </div>
          </div>
        )}
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};
export default ProductView;
