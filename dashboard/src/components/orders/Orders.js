/** @format */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import moment from "moment";

const Orders = (props) => {
  const { orders } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Total</th>
          <th scope="col">Paid</th>
          <th scope="col">Date</th>
          <th>Status</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>
              <b>{order.user.name}</b>
            </td>
            <td>{order.user.email}</td>
            <td>$ {order.totalPrice}</td>
            <td>
              <span
                className={`badge rounded-pill ${
                  order.isPaid ? "alert-success" : "alert-danger"
                }`}
              >
                {order.isPaid
                  ? `Paid on ${moment(order.paidAt).format("MMM Do Y")}`
                  : "Not Paid"}
              </span>
            </td>
            <td>{moment(order.createdAt).format("MMM Do Y")}</td>
            <td>
              <span
                className={`badge rounded-pill ${
                  order.isDelivered ? "alert-success" : "alert-danger"
                }`}
              >
                {order.isDelivered ? "Deilevered" : "Not Delivered"}
              </span>
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/order/${order._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
