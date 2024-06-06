import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { NavBtnLink } from "../Navbar/NavElement";
import { convertToBase64 } from "../utils/convert";
import axios from 'axios';

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const [courseList, setCourseList] = useState([]);

  const getCourseListByCategory = useCallback(async (category) => {
    try {
      const response = await axios.get(`/api/courses/get-course-by-category/${category}`);
      return response.data; // Trả về dữ liệu thay vì gán vào state
    } catch (error) {
      console.error('Failed to get course list by category', error);
    }
  }, []);

  useEffect(() => {
    const categories = ['monngonbamien', 'category2', 'category3']; // Danh sách các category

    Promise.all(categories.map(category => getCourseListByCategory(category)))
      .then(results => {
        // results là một mảng chứa kết quả của tất cả các Promise
        // Mỗi phần tử trong results tương ứng với kết quả của một Promise
        // Gộp tất cả các kết quả lại thành một mảng duy nhất và gán vào state
        setCourseList(results.flat());
      });
  }, [getCourseListByCategory]);
  return (
    <>
      
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {
                  courseList.length === 0 ? (
                    <div className="mb-5">
                      <Loading />
                    </div>
                  ) : 
                 (
                  <>
                    
                    {courseList.map((course) => (

                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={course._id}
                      >
                        <div className="border-product">
                          <Link to={`/products/${course._id}`}>
                            <div className="shopBack">
                              <img src={course.image} alt={course.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/products/${course._id}`}>
                                {course.name}
                              </Link>

                            </p>
                              <p>
                                <NavBtnLink to={''}>
                                  Time
                                </NavBtnLink>
                              </p>
                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} Đánh giá`}
                            />
                            <h3>{course.price}Đ</h3>
                            {/* <h3>{course.description}Đ</h3> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
