import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/home";
import { ProductDetail } from "./component/Product/prodDetail";
import Search from "./component/Product/search";
import { Products } from "./component/Product/products";
import Login from "./component/User/loginSignup";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOption.js";
import { Profile } from "./component/User/Profile";
import { ProRoute } from "./component/Route/route";
import UpdateProfile from "./component/User/update/updateProfile";
import { UpdatePassword } from "./component/User/update/updatePassword";
import { ForgetPassword } from "./component/User/update/forgetPassword";
import { ResetPassword } from "./component/User/update/resetPassword";
import OrderSuccess from "./component/Order/orderSuccess";
import { Cart } from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import Payment from "./component/Payment/payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrder from "./component/Order/myorder";
import OrderDetail from "./component/Order/orderDetail";
import axios from "axios";
function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.key);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid-Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated === true && <UserOptions />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/login" component={Login} />
        <ProRoute exact path="/account" component={Profile} />
        <ProRoute exact path="/profile/update" component={UpdateProfile} />
        <ProRoute exact path="/update-password" component={UpdatePassword} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/shipping" component={Shipping} />
        <ProRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProRoute exact path="/order/success" component={OrderSuccess} />
        <ProRoute exact path = "/orders" component={MyOrder} />
        <ProRoute exact path = "/order/:id" component={OrderDetail} />
      </Switch>
      <Footer />
    </Router>
  );
}
export default App;
