import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then(res => {
        console.log(res.data);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch(error => dispatch(purchaseBurgerFail(error)));
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};
export const fetchOrderSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};
export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios
      .get("/orders.json")
      .then(res => {
        const fetchOrdersArray = [];
        for (let key in res.data) {
          fetchOrdersArray.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrderSuccess(fetchOrdersArray))
      })
      .catch(err => {
       dispatch(fetchOrdersFail(err))
      });
  };
};