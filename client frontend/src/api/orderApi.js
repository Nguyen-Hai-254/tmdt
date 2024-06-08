import axios from "axios";
// import { useSelector } from "react-redux";
import store from "../Redux/store.js";

const domain = `http://localhost:${5000}`;
// const userInfo = useSelector((state) => state.userLogin.userInfo);
const userInfo = store.getState().userLogin.userInfo;

export const addCourseToCart = async (orderItems) => {
  const res = await axios({
    method: "post",
    headers: {
      Authorization: userInfo.token ? `Bearer ${userInfo.token}` : "",
    },
    url: `${domain}/api/orders?orderItems=${orderItems}`,
    // data: {
    //   orderItems: orderItems,
    // },
  });

  return res.data;
};
