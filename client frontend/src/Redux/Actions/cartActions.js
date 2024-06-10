import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_INIT,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../Constants/CartConstants";

export const initCart =
  (orderItems = []) =>
  async (dispatch, getState) => {
    // const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_INIT,
      payload: orderItems?.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: 1,
      })),
    });
  };
// ADD TO CART
export const addToCart =
  (id, qty = 1, course = null) =>
  async (dispatch, getState) => {
    // const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: course._id,
        name: course.name,
        image: course.image,
        price: course.price,
        // countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// REMOVE PRODUCT FROM CART
export const removefromcart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
