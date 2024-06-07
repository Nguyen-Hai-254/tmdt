import axios from "axios";
// import { useSelector } from "react-redux";
import store from "../Redux/store.js";

const domain = `http://localhost:${5000}`;
// const userInfo = useSelector((state) => state.userLogin.userInfo);
const userInfo = store.getState().userLogin.userInfo;

export const getCourseById = async (id) => {
  const res = await axios({
    method: "get",
    headers: {
      Authorization: userInfo.token ? `Bearer ${userInfo.token}` : "",
    },
    url: `${domain}/api/course/get-course-by-id?_id=${id}`,
  });

  return res.data;
};
