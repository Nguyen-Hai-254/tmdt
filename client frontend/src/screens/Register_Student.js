import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Form, Input, Button, Radio, Alert, Spin, Typography } from 'antd';
import { register } from "../Redux/Actions/userActions";
import logo from "../images/logo.png";  
import registerBackground from "../images/registerbackground.png"; 

const { Title } = Typography; 



const StudentRegister = ({ location, history }) => {
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split("=")[1] : "/";

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [userInfo, history, redirect]);

    const submitHandler = (values) => {
        const { name, username, email, password, telephone, sex } = values;
        dispatch(register(name, username, email, password, telephone, sex, 'Học viên'));
    };

    return (
        <>
            <div className="register-student--container">
                <div className="register--photo">
                    <Link to="/">
                    <img src={logo} alt="Logo" className="register--logo" />
                    </Link>
                    <img src={registerBackground} alt="Register" className="register--photo-img" />
                </div>
                <div className="register-student--content">
                    <div className="register-student--content--title">
                        <Title level={2}>Đăng ký học viên</Title>
                    </div>
                    <div className="register-student--content--form">
                        {error && <Alert message={error} type="error" showIcon />}
                        {loading && <Spin size="large" />}
                        
                        <Form form={form} layout="vertical" className="Login" onFinish={submitHandler}>
                            <div className="form-row">
                                <Form.Item
                                    name="name"
                                    label="Họ và tên"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn' }]}
                                    className="form-item"
                                >
                                    <Input placeholder="Họ và tên" />
                                </Form.Item>
                                <Form.Item
                                    name="username"
                                    label="Username"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập của bạn' }]}
                                    className="form-item"
                                >
                                    <Input placeholder="Username" />
                                </Form.Item>
                            </div>

                            <div className="form-row">
                                <Form.Item
                                    name="telephone"
                                    label="Số điện thoại"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn' }]}
                                    className="form-item"
                                >
                                    <Input placeholder="Số điện thoại" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Mật khẩu"
                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn' }]}
                                    className="form-item"
                                >
                                    <Input.Password placeholder="Mật khẩu" />
                                </Form.Item>

                            </div>
                            <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email của bạn' },
                                        { type: 'email', message: 'Vui lòng nhập email hợp lệ' }
                                    ]}
                                    className="form-item"
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>


                            <Form.Item
                                name="sex"
                                label="Giới tính"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính của bạn' }]}
                            >
                                <Radio.Group>
                                    <Radio value="Nam">Nam</Radio>
                                    <Radio value="Nữ">Nữ</Radio>
                                    <Radio value="Khác">Khác</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentRegister;
