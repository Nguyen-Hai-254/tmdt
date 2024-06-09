import React, { useCallback, useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { NavBtnLink } from "../Navbar/NavElement";
import { listProductByCategoryId } from "../../Redux/Actions/ProductActions";
import Header from "../Header";
import Navbar from "../Navbar/NavBarForUser";
import ContactInfo from "./ContactInfo";
import Footer from "../Footer";
import CalltoActionSection from "./CalltoActionSection";
import axios from 'axios';

const ShopSectionCategory = (props) => {
  const { keyword, pagenumber } = props;
  const [courseList, setCourseList] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const getCourseListByCategory = useCallback(async () => {
    try {
      const response = await axios.get(`/api/course/get-course-by-category?category=${id}`);
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
    <Header />
      <Navbar/>
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
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </>
  );
};

export default ShopSectionCategory;
