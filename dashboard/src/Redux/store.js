/** @format */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userListReducer } from "./Reducers/UserReducers";
import {
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
  productEditReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderDetailsReducer,
  orderListReducer,
  orderDeliveredReducer,
} from "./Reducers/OrderReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userListReducer: userListReducer,
  productListReducer: productListReducer,
  productDeleteReducer: productDeleteReducer,
  productCreateReducer: productCreateReducer,
  productEditReducer: productEditReducer,
  productUpdateReducer: productUpdateReducer,
  orderListReducer: orderListReducer,
  orderDetailsReducer: orderDetailsReducer,
  orderDeliveredReducer: orderDeliveredReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
