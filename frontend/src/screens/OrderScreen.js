/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/LoadingError/Error";

const OrderScreen = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // calculate price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    cart.itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 50 : 30);

    cart.totalPrice = (
      Number(cart.itemsPrice) + Number(cart.shippingPrice)
    ).toFixed(2);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>
                  <a href={`mailto:admin@example.com`}>{userInfo.email}</a>
                </p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: {cart.shippingAddress.country}</p>
                <p>Pay method: {cart.paymentMethod}</p>
                <div className="bg-info p-2 col-12">
                  <p className="text-white text-center text-sm-start">
                    Paid on Jan 12 2021
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                </p>
                <div className="bg-danger p-1 col-12">
                  <p className="text-white text-center text-sm-start">
                    Not Delivered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Your order is empty</Message>
            ) : (
              <>
                {cart.cartItems.map((item, i) => (
                  <div className="order-product row" key={i}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-6 col-md-2  d-flex align-items-center flex-column justify-content-center ">
                      <h4>QUANTITY</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center">
                      <h4>SUBTOTAL</h4>
                      <h6>$ {item.price * item.qty}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>$ {cart.itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>$ {cart.shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>$ {cart.totalPrice}</td>
                </tr>
              </tbody>
            </table>
            <div className="col-12">
              <PayPalButton amount={345} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
