import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {clearError, createOrder}  from  '../../actions/orderAction' 

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { shippingAddress, cartItems } = useSelector((state) => state.cart);
  const { USER } = useSelector((state) => state.user);
  const {loading,error} = useSelector((state) => state.newOrder);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  useEffect(()=>{
    if(error)
    {
        alert.error(error);
        dispatch(clearError());
    }
  },[alert,error,dispatch])
  const shippingInfo = shippingAddress
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try{
        const config = {
            headers:{
                'content-type' : 'application/json',
            }
        }
        const {data} = await axios.post("/api/v1/process/payment",paymentData,config)
        const client_secret = data.client_secret;
        if(!stripe || !elements) return;
        const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: USER.name,
                email: USER.email,
                address: {
                  line1: shippingInfo.address,
                  city: shippingInfo.city,
                  state: shippingInfo.state,
                  postal_code: shippingInfo.pincode,
                  country: shippingInfo.country,
                },
              },
            },
          });
        if(result.error)
        {
            payBtn.current.disabled(false);
            alert.error(result.error.message)
        }
        else{
            if(result.paymentIntent.status == "succeeded")
            {
              order.paymentInfo ={
                id:result.paymentIntent.id,
                status:result.paymentIntent.status
              }
              history.push("/order/success");
              dispatch(createOrder(order)).then(()=>{
              history.push("/order/success");
              });
            }
            else
            {
                alert.error("There is some issue while payment Please try after some time")
            }
        }    
    }
    catch(error)
    {
        payBtn.current.disabled = false;
        alert.error(error);
    }
  };
  return (
    <Fragment>
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(event) =>{submitHandler(event)}}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;