import axios from "axios";
import store from '../Redux/store.js'

const domain = `http://localhost:${5000}`;
const userInfo = store.getState().userLogin.userInfo;


export const getAllCourseByAdmin = async () => {
    const res = await axios({
        method: "get",
        headers: {
            'Authorization': userInfo.token ? `Bearer ${userInfo.token}` : ''
        },
        url: `${domain}/api/course/get-all-course-by-admin`,
    })

    return res.data;

}