// FoodDetail.jsx
import React, { useState } from 'react';
import { Card, Tag, Tabs, List } from 'antd';
import { useLocation } from 'react-router-dom';
import NavBarForChef from "../../components/Navbar/NavBarForAdminOrChef";
import Header from '../../components/Header';


const { TabPane } = Tabs;

const FoodDetail = () => {
  const location = useLocation();
  const food = location.state.food;
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      <Header />
      <NavBarForChef />
      <div className="food-detail-container">

        <Card
          title={food.name}
          // cover={<img alt={food.name} src={food.image} className="food-detail-image" />}
          className="food-detail-card"
        >
          <div className="food-detail-top">
            <img alt={food.name} src={food.image} className="food-detail-image" />
            <div className="food-detail-extra">
              <div className="food-kind">
                <p><strong>Loại món ăn:</strong> {food.kind}</p>
              </div>
              <div className="food-is-free">
                <p><strong>Miễn phí:</strong>
                  <Tag color={food.isFree ? "green" : "red"}>
                    {food.isFree ? "Có" : "Không"}
                  </Tag>
                </p>
              </div>
              <div className="food-time">
                <p><strong>Thời lượng:</strong> {food.time}</p>
              </div>
            </div>
          </div>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Mô Tả" key="1">
              <p>{food.description}</p>
            </TabPane>
            <TabPane tab="Nguyên Liệu" key="2">
              <p><strong>Nguyên Liệu:</strong></p>
              <List
                dataSource={food.ingredient}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </TabPane>
            <TabPane tab="Sơ Chế" key="3">
              <p><strong>Sơ Chế:</strong></p>
              <List
                dataSource={food.processing}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </TabPane>
            <TabPane tab="Thực Hiện" key="4">
              <p><strong>Thực Hiện:</strong></p>
              <List
                dataSource={food.make}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </TabPane>
          </Tabs>

        </Card>
      </div>
    </>
  );
};

export default FoodDetail;
