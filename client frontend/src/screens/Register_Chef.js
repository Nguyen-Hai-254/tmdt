import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/userActions";
import { Form, Input, Radio, Button, Typography, Upload, Image} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { convertToBase64 } from "../utils/convert";
import logo from "../images/logo.png";
import registerBackground from "../images/registerbackground.png";

const { TextArea } = Input;
const { Title } = Typography;

const ChefRegister = ({ location, history }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split("=")[1] : "/";
    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;
    const [certification, setCertification] = useState("");
    const [imgURL, setImgURL] = useState('');
    const [showUpload, setShowUpload] = useState(true);
    const [fileList, setFileList] = useState([]);

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const handleUploadCoverImg = ({ fileList }) => {
        if (fileList) {
            setFileList(fileList);
            const imageURL = URL.createObjectURL(fileList[0].originFileObj);
            setImgURL(imageURL);
            setShowUpload(false);
        }
    };

    const handleDeleteImg = () => {
        setImgURL('');
        setShowUpload(true);
        setFileList([]);
    };

    const handleChangeImage = useCallback(async () => {
        if (fileList.length <= 0) {
            return;
        }
        const base64 = await getBase64(fileList[0]?.originFileObj);
        setCertification(base64);
    }, [fileList])
    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
        handleChangeImage()

    }, [userInfo, history, redirect, handleChangeImage]);

    const submitHandler = async (values) => {
        const { name, username, email, password, telephone, sex, description, certification } = values;
        dispatch(register(name, username, email, password, telephone, sex, 'Đầu bếp', description, certification));
    };

    // const handleChangeImage = async (e) => {
    //     console.log('this e', e)
    //     // const base64 = await convertToBase64(e);
    //     // setCertification(base64);
    //     console.log(certification)
    // }

    return (
        <>
            <div className="register-student--container">
                <div className="register--photo">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="register--logo" />
                    </Link>
                    <img src={registerBackground} alt="Register" className="register--photo-img" />
                </div>
                <div className="register-chef--content">
                    <div className="register-student--content--title">
                        <Title level={2}>Đăng ký bán khóa học</Title>
                    </div>
                    <div className="register-student--content--form">
                        {error && <Message variant="alert-danger">{error}</Message>}
                        {loading && <Loading />}
                        <Form
                            form={form}
                            onFinish={submitHandler}
                            className="Login"
                            layout="vertical"
                        >
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
                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn' }]}
                                    label="Mật khẩu"
                                    className="form-item"
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                            </div>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email của bạn' },
                                    { type: 'email', message: 'Vui lòng nhập email hợp lệ' }
                                ]}
                                label="Email"
                                className="form-item"

                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Giới thiệu bản thân"
                                rules={[{ required: true, message: 'Vui lòng giới thiệu bản thân' }]}
                                className="form-item"
                            >
                                <TextArea placeholder="Giới thiệu bản thân" />
                            </Form.Item>

                            <Form.Item
                                name="sex"
                                label="Giới tính"
                                className="form-item"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính của bạn' }]}
                            >
                                <Radio.Group>
                                    <Radio value="Nam">Nam</Radio>
                                    <Radio value="Nữ">Nữ</Radio>
                                    <Radio value="Khác">Khác</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                name="certification"
                                label="Chứng chỉ đầu bếp"
                                rules={[{ required: true, message: 'Vui lòng cung cấp chứng chỉ' }]}
                            >
                                {showUpload === false ? (
                                    <Image style={{width:"60%"}} src={imgURL} />
                                ) :
                                <Upload.Dragger
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleUploadCoverImg}
                                >

                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
                                </Upload.Dragger>}
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChefRegister;
