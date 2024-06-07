import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Tag, Button } from 'antd';
import { getAllFoodByChef } from "../../api/ChefApi";
import NavBarForAdminOrChef from '../../components/Navbar/NavBarForAdminOrChef';
import Header from '../../components/Header';


const FoodCard = ({ data }) => (
    <Card
        title={data.name}
        cover={<img alt={data.name} src={data.image} />}
        className="food-card"
    >
        <div className="food-details">
            <div className="detail-info">
                <div className="food-kind">
                    <p><strong>Kind:</strong> {data.kind}</p>
                </div>
                <div className="food-is-free">
                    <p><strong>Is Free:</strong>
                        <Tag color={data.isFree ? "green" : "red"}>
                            {data.isFree ? "Yes" : "No"}
                        </Tag>
                    </p>
                </div>
                <div className="food-time">
                    <p><strong>Time:</strong> {data.time}</p>
                </div>
            </div>
            <div className="button-detail">
                <Button type='primary'>Chi tiết</Button>
            </div>
        </div>
    </Card>
);


const FoodManagement = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const response = await getAllFoodByChef();
                setData(response.data);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };

        fetchFoodData();
    }, []);

    return (
        <>
            <Header />
            <NavBarForAdminOrChef role='Đầu bếp' />
            <div className="food-management-container">
                <Row gutter={[16, 16]}>
                    {data.map(food => (
                        <Col key={food._id} xs={24} sm={12} md={8}>
                            <FoodCard data={food} />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default FoodManagement;
