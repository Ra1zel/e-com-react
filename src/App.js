import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./Pages/Auth";
import BrowseProducts from "./Pages/BrowseProducts";
import CategoryProductsList from "./Pages/CategoryProductsList";
import CheckOut from "./Pages/CheckOut";
import HomePage from "./Pages/HomePage";
import Orders from "./Pages/Orders";
import ProductView from "./Pages/ProductView";
import AuthContext from "./store/Auth-Context";
function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedin = authCtx.isLoggedin;
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage></HomePage>
      </Route>
      <Route path="/product/:productId">
        <ProductView></ProductView>
      </Route>
      <Route path="/Browse" exact>
        <BrowseProducts></BrowseProducts>
      </Route>
      <Route path="/Browse/:category" exact>
        <CategoryProductsList></CategoryProductsList>
      </Route>
      {isLoggedin && (
        <Route path="/checkout">
          <CheckOut></CheckOut>
        </Route>
      )}
      {isLoggedin && (
        <Route path="/Orders">
          <Orders></Orders>
        </Route>
      )}
      {!isLoggedin && (
        <Route path="/auth" exact>
          <Auth></Auth>
        </Route>
      )}
      <Route path="*">
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  );
}

export default App;
