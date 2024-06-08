import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import axios from 'axios';
import CourseList from '../components/CourseList';
import Header from '../components/Header';
import { useDispatch } from "react-redux"; 
import { addToCart } from "../Redux/Actions/cartActions";

const { Option } = Select;

const CourseListScreen = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/course/get-all-course`);
        setCourses(response.data.data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const handleCategoryChange = async (value) => {
    setCategory(value);
    setLoading(true);
    try {
      const response = value === 'all'
        ? await axios.get(`/api/course/get-all-course`)
        : await axios.get(`/api/course/get-course-by-category`, { params: { category: value } });
      setCourses(response.data.data);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
    setLoading(false);
  };

  const handleAddToCart = (courseId) => {
    console.log(`Thêm khóa học ${courseId} vào giỏ hàng`);
    dispatch(addToCart(courseId, 1)); 
  };

  return (
    <>
      <Header />
      <div className="course-list-page">
        <h2>Danh sách khóa học</h2>
        <Select defaultValue="all" onChange={handleCategoryChange} style={{ width: 200 }}>
          <Option value="all">Tất cả</Option>
          <Option value="regionalFood">Món ăn ba miền</Option>
          <Option value="streetFood">Món ăn đường phố</Option>
          <Option value="foodForMomAndBaby">Món ăn cho mẹ và bé</Option>
          <Option value="bartending">Pha chế tổng hợp</Option>
          <Option value="freeFood">Món ăn miễn phí</Option>
        </Select>
        {loading ? <Spin size="large" /> : <CourseList courses={courses} handleAddToCart={handleAddToCart} />} 
      </div>
    </>
  );
};

export default CourseListScreen;