/** @format */
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";

const LatestOrder = (props) => {
  const { orders, loading, error } = props;

  return (
    <div className="card-body">
      <h5 className="card-title">Latest orders</h5>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <>
                  <tr key={order._id}>
                    <td>
                      <b>{order.user.name}</b>
                    </td>
                    <td>{order.user.email}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      <span
                        className={`badge rounded-pill  ${
                          order.isPaid ? "alert-success" : "alert-danger"
                        }`}
                      >
                        {order.isPaid
                          ? `Paid At ${moment(order.paidAt).format("MMM Do Y")}`
                          : "Not Paid"}
                      </span>
                    </td>
                    <td>{moment(order.createdAt).format("MMM Do Y")}</td>
                    <td className="d-flex justify-content-end align-item-center">
                      <Link
                        to={`/order/${order._id}`}
                        className="text-success"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
