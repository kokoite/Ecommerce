import { Typography } from "@material-ui/core";
import { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { orderDetailAction } from "../../actions/orderAction";
import OrderStatus from "./orderStatus";
import "./orderdetail.css";
import Loader from "../layout/Loader/Loader";
import CartItem from '../cart/ConfirmOrderCart'
const OrderDetail = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, order} = useSelector((state) => state.orderDetail);
  const address = order
    ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`
    : "";
  useEffect(() => {
    if (error) {
      alert.error(error);
      return;
    }
    dispatch(orderDetailAction(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <OrderStatus activeStep={0} />
          <div className="orderDetailContainer">
            <div className="orderDetailBox">
              <div>
                <div className="orderDetailShipInfo">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailShipInfoBox">
                    <div>
                      <p>Name: </p>
                      <span>{order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone: </p>
                      <span>{order.shippingInfo.phone}</span>
                    </div>
                    <div>
                      <p>Address: </p>
                      <span>{address}</span>
                    </div>
                  </div>
                </div>
                <div className="orderDetailCartItems">
                  <Typography>Order Items: </Typography>
                  <div>
                    {order.orderItems.map((item, idx) => (
                      <CartItem product={item} key={idx} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="orderDetailLine"></div>
              <div className="ordersummary">
                <Typography>Order Summary</Typography>
                <div className="orderDetailSummary">
                  <div>
                    <p>Subtotal</p>
                    <span>{`₹${order.itemsPrice}`}</span>
                  </div>
                  <div>
                    <p>Shipping Charge</p>
                    <span>{`₹${order.shippingPrice}`}</span>
                  </div>
                  <div>
                    <p>GST</p>
                    <span>{`₹${order.taxPrice}`}</span>
                  </div>
                  <div>
                    <p>TOTAL</p>
                    <span>{`₹${order.totalPrice}`}</span>
                  </div>
                </div>
                <button >Amount Paid {order.totalPrice}</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default OrderDetail;
