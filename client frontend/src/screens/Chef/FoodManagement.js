import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Tag, Button } from 'antd';
import { getAllFoodByChef } from "../../api/ChefApi";
<<<<<<< HEAD
import { useHistory } from 'react-router-dom';
=======
import NavBarForAdminOrChef from '../../components/Navbar/NavBarForAdminOrChef';
import Header from '../../components/Header';
>>>>>>> b4372bc2dbe044fcce7ed26d31cce3525784da6c



const FoodCard = ({ data }) => {
    const history = useHistory();

    const handleDetailClick = () => {
        history.push({
            pathname: `/food/${data._id}`,
            state: { food: data }
        });
    };
    return(
    <Card
        title={data.name}
        cover={<img alt={data.name} src={data.image} />}
        className="food-card"
    >
        <div className="food-details">
            <div className="detail-info">
                <div className="food-kind">
                    <p><strong>Loại món ăn:</strong> {data.kind}</p>
                </div>
                <div className="food-is-free">
<<<<<<< HEAD
                    <p><strong>Miễn phí:</strong> 
                    <Tag color={data.isFree ? "green" : "red"}>
                        {data.isFree ? "Có" : "Không"}
                    </Tag>
=======
                    <p><strong>Is Free:</strong>
                        <Tag color={data.isFree ? "green" : "red"}>
                            {data.isFree ? "Yes" : "No"}
                        </Tag>
>>>>>>> b4372bc2dbe044fcce7ed26d31cce3525784da6c
                    </p>
                </div>
                <div className="food-time">
                    <p><strong>Thời lượng:</strong> {data.time}</p>
                </div>
            </div>
            <div className="button-detail">
                <Button type='primary' onClick={handleDetailClick}>Chi tiết</Button>
            </div>
        </div>
    </Card>
);
};


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
<<<<<<< HEAD
            <NavBarForChef />
=======
            <Header />
            <NavBarForAdminOrChef role='Đầu bếp' />
>>>>>>> b4372bc2dbe044fcce7ed26d31cce3525784da6c
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