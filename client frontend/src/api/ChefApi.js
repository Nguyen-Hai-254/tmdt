import axios from "axios";
import store from '../Redux/store.js'

const domain = `http://localhost:${5000}`;
const userInfo = store.getState().userLogin.userInfo;


export const getAllCourseByChef = async () => {
    const res = await axios({
        method: "get",
        headers: {
            'Authorization': userInfo.token ? `Bearer ${userInfo.token}` : ''
        },
        url: `${domain}/api/course/get-all-course-by-chef`,
    })

    return res.data;

}

export const getAllFoodByChef = async () => {
    const res = await axios({
        method: "get",
        headers: {
            'Authorization': userInfo.token ? `Bearer ${userInfo.token}` : ''
        },
        url: `${domain}/api/food/get-all-food-by-chef`,
    })

    return res.data;

}