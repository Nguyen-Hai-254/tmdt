import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Rating from "./Rating";
import Pagination from "./pagination";
import Loading from "../LoadingError/Loading";
import { NavBtnLink } from "../Navbar/NavElement";
import axios from 'axios';

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const [courseList, setCourseList] = useState([]);

  const getCourseListByCategory = useCallback(async () => {
    try {
      const response = await axios.get(`/api/course/get-all-course`);
      console.log('Course list by category', response.data.data);
      setCourseList(response.data.data); // Gán response vào state variable
    } catch (error) {
      console.error('Failed to get course list by category', error);
    }
  }, []);

  useEffect(() => {
    getCourseListByCategory();
  }, [getCourseListByCategory]);
  const courseArray = Object.values(courseList);
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
                    {courseArray[0].map((course) => (
                      course && (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={course._id}
                        style={{ border: '4px solid #EC2028' }}
                      >
                        <div className="border-product">
                          <Link to={`/course/${course._id}`}>
                            <div className="shopBack">
                              <img src={course.image} alt={course.name} />
                            </div>
                          </Link>
                          <div className="shoptext"
                          style={{ marginTop: '10px', marginBottom: '10px' }}
                          >
                            <p>
                              <Link to={`/course/${course._id}`} style={{ marginTop: '10px', marginBottom: '10px' }}>
                                {course.name}
                              </Link>
                            </p>
                            <p>
                                <NavBtnLink to={`/course/${course._id}`}>
                                  {course.time}
                                </NavBtnLink>
                            </p>
                            <h3>{course.price}Đ</h3>
                            {/* <h3>{course.description}Đ</h3> */}
                          </div>
                        </div>
                      </div>
                      )
                    ))}
                  </>
                )}
                {/* Pagination */}
                <Pagination
                  keyword={keyword ? keyword : ""}
                  pagenumber={pagenumber ? pagenumber : ""}
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
