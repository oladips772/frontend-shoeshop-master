/** @format */
import React, { useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getOrderDetails } from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";

const OrderDetailmain = (props) => {
  const { orderId } = props;
  const dispatch = useDispatch();
  const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer);
  const { loading, error, order } = orderDetailsReducer;

  const orderDeliveredReducer = useSelector((state) => state.orderDeliveredReducer);
  const { loading: loadingDelivered, sucess: successDelivered} = orderDeliveredReducer;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered]);
   
  const deliverHandler = (e) => {
    e.preventDefault(dispatch(deliverOrder(order)));
  }

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
          Back To Orders
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {order._id}
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <select
                  className="form-select d-inline-block"
                  style={{ maxWidth: "200px" }}
                >
                  <option>Change status</option>
                  <option>Awaiting payment</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
                <Link className="btn btn-success ms-2" to="#">
                  <i className="fas fa-print"></i>
                </Link>
              </div>
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                {order.isPaid && (
                <div className="box shadow-sm bg-light">
                  {loadingDelivered && (<Loading />)}
                  <button
                    className={`btn  ${
                      order.isDelivered ? "btn-success col-12" : "btn-dark col-12"
                    }`}
                    onClick={deliverHandler}
                  >
                    {order.isDelivered
                      ? `DELIVERED ON ${moment(order.DeliveredAt).format(
                          "MMM Do Y"
                        )}`
                      : "MARK AS DELIVERED"}
                  </button>
                </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain;
