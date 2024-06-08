import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, List, Avatar, message } from 'antd';
import axios from 'axios';
import Header from "../components/Header";
import { useSelector } from 'react-redux';
import { getCoursByChef } from '../api/ChefApi';

const AddFoodToCourse = ({ match }) => {
  const [form] = Form.useForm();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const fetchFoods = async (query) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userInfo.token}`
        },
        params: {
          keyword: query
        }
      };

      const response = await axios.get(`/api/food/search-food-by-chef`, config);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Failed to fetch foods', error);
    }
  };

  const handleSearch = async (values) => {
    const { query } = values;
    if (query) {
      setLoading(true);
      await fetchFoods(query);
      setLoading(false);
    }
  };

  const handleAddFood = (food) => {
    setSelectedFoods((prevFoods) => [...prevFoods, food]);
  };

  const handleRemoveFood = (foodId) => {
    setSelectedFoods((prevFoods) => prevFoods.filter(food => food._id !== foodId));
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const newSelectedFoods = [...selectedFoods];
      [newSelectedFoods[index], newSelectedFoods[index - 1]] = [newSelectedFoods[index - 1], newSelectedFoods[index]];
      setSelectedFoods(newSelectedFoods);
    }
  };

  const handleMoveDown = (index) => {
    if (index < selectedFoods.length - 1) {
      const newSelectedFoods = [...selectedFoods];
      [newSelectedFoods[index], newSelectedFoods[index + 1]] = [newSelectedFoods[index + 1], newSelectedFoods[index]];
      setSelectedFoods(newSelectedFoods);
    }
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userInfo.token}`
        }
      };

      const response = await axios.post(`/api/course/add-food-to-course?_id=${match.params.courseId}`, {
        foodList: selectedFoods.map(food => food._id)
      }, config);
      message.success('Đã thêm món ăn vào khóa học thành công');
    } catch (error) {
      message.error('Thêm món ăn vào khóa học thất bại');
    }
  };

  useEffect(() => {
    const fetchApi = async (courseId) => {
      try {
        const res = await getCoursByChef(courseId);
        setSelectedFoods(res.data.foodList)
      } catch (e) {
        console.error(e.message)
      }
    }

    fetchApi(match.params.courseId);
  }, [])

  return (
    <>
      <Header />
      <div className="add-food-to-course--wrapper">
        <div className="container">
          <h2 className="add-food-to-course--title">Thêm món ăn vào khóa học</h2>
          <div className="add-food-to-course--form">
            <Form
              form={form}
              name="search-food"
              layout="inline"
              onFinish={handleSearch}
              autoComplete="off"
            >
              <Form.Item
                name="query"
                rules={[{ required: true, message: 'Vui lòng nhập tên món ăn' }]}
              >
                <Input placeholder="Tìm kiếm món ăn" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Form>

            <List
              itemLayout="horizontal"
              dataSource={searchResults}
              renderItem={food => (
                <List.Item
                  actions={[<Button onClick={() => handleAddFood(food)}>Thêm món ăn</Button>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={food.image} />}
                    title={food.name}
                  />
                </List.Item>
              )}
            />

            <h3>Danh sách món ăn trong khóa học</h3>
            <List
              itemLayout="horizontal"
              dataSource={selectedFoods}
              renderItem={(food, index) => (
                <List.Item
                  actions={[
                    <Button onClick={() => handleMoveUp(index)}>Lên</Button>,
                    <Button onClick={() => handleMoveDown(index)}>Xuống</Button>,
                    <Button onClick={() => handleRemoveFood(food._id)}>Xóa</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={food.image} />}
                    title={food.name}
                  />
                </List.Item>
              )}
            />

            <div className="wrap--btn">
              <Button type="primary" size="large" onClick={handleSubmit}>
                Hoàn thành
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFoodToCourse;
