/** @format */
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../Constants/ProductConstants";
import axios from "axios";
import { logout } from "./UserActions";

export const listProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = await axios.get(`/api/products/all`, config);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    
  } catch (error) {
    const message =
      error.message && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized,token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: message,
    });
  }
};
