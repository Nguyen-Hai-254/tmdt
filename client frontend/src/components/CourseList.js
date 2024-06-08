import React from 'react';
import { List, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';

const CourseList = ({ courses, handleAddToCart }) => (
  <List
    itemLayout="horizontal"
    dataSource={courses}
    renderItem={course => (
      <List.Item
        actions={[
          <Link to={`/course-detail/${course._id}`}><Button type="primary">Xem chi tiết</Button></Link>,
          <Button type="danger" onClick={() => handleAddToCart(course._id)}>Mua khóa học</Button> 
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={course.image} />}
          title={course.name}
          description={`Đầu bếp: ${course.user.name} | Học phí: ${course.price} VND`}
        />
      </List.Item>
    )}
  />
);

export default CourseList;