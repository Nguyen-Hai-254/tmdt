import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Checkbox, Form, Image, Input, Select, Upload, message } from 'antd';
import { InboxOutlined, CompassFilled } from '@ant-design/icons';
import { foodKindEnum } from "../utils/enum";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const { TextArea } = Input;

const FoodUpdate = () => {
    const { foodId } = useParams(); // Assuming you are using react-router-dom
    const userInfo = useSelector((state) => state.userLogin.userInfo);

    const [form] = Form.useForm();
    const [isFree, setIsFree] = useState(false);
    const [imgURL, setImgURL] = useState('');
    const [certification, setCertification] = useState("");
    const [showUpload, setShowUpload] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [initialValues, setInitialValues] = useState({});

    const [messageApi, contextHolder] = message.useMessage();

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const success = useCallback(() => {
        messageApi.open({
            type: 'success',
            content: 'Cập nhật món ăn thành công',
        });
    }, [messageApi]);

    const handleChangeCheckbox = useCallback((e) => {
        setIsFree(e.target.checked);
    }, []);

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
    }, [fileList]);

    const options = Object.entries(foodKindEnum).map(([key, value]) => ({ label: value, value: value }));

    const handleUpdateFood = useCallback(async (values) => {
        const body = {
            ...values,
            isFree,
            image: certification,
        };

        const url = `http://localhost:5000/api/food/update-food-by-chef?_id=${foodId}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            },
        };
        const response = await axios.put(url, body, config);
        if (response?.status === 200) {
            success();
        }
    }, [certification, foodId, isFree, success, userInfo.token]);

    const fetchFoodData = useCallback(async () => {
        const url = `http://localhost:5000/api/food/get-food-by-chef?_id=${foodId}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            },
        };
        const response = await axios.get(url, config);
        
        if (response?.status === 200) {
            console.log("trueeeeee");
            const foodData = response.data.data;
            setInitialValues({
                name: foodData.name,
                kind: foodData.kind,
                time: foodData.time,
                description: foodData.description,
                ingredient: foodData.ingredient,
                processing: foodData.processing,
                make: foodData.make,
                isFree: foodData.isFree
            });
            setImgURL(foodData.image);
            setShowUpload(!foodData.image);
            setIsFree(foodData.isFree);
        }
    }, [foodId, userInfo.token]);

    useEffect(() => {
        handleChangeImage();
    }, [handleChangeImage]);

    useEffect(() => {
        fetchFoodData();
    }, [fetchFoodData]);

    return (
        <>
            {contextHolder}
            <Header />
            <div className="food-register--wrapper">
                <div className="container">
                    <h2 className="food-register--title">Cập nhật món ăn</h2>
                    <div className="food-register--form">
                        <Form
                            form={form}
                            name="update-food"
                            layout="vertical"
                            onFinish={handleUpdateFood}
                            autoComplete="off"
                            initialValues={initialValues}
                        >
                            <Form.Item
                                label="Tên món ăn"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên món ăn',
                                    },
                                ]}
                            >
                                <Input placeholder="Tên món ăn" />
                            </Form.Item>

                            <Form.Item
                                label="Loại món ăn"
                                name="kind"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập loại món ăn',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Loại món ăn"
                                    options={options}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Thời lượng"
                                name="time"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn thời lượng',
                                    },
                                ]}
                            >
                                <Input placeholder="Thời lượng" />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả chi tiết món ăn"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả chi tiết món ăn',
                                    },
                                ]}
                            >
                                <TextArea placeholder="Mô tả chi tiết món ăn" style={{ height: 100 }} />
                            </Form.Item>

                            <Form.Item
                                label="Nguyên liệu"
                                name="ingredient"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập nguyên liệu',
                                    },
                                ]}
                            >
                                <TextArea placeholder="Nguyên liệu" style={{ height: 100 }} />
                            </Form.Item>

                            <Form.Item
                                label="Cách chế biến"
                                name="processing"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập cách chế biến món ăn',
                                    },
                                ]}
                            >
                                <TextArea placeholder="Cách chế biến" style={{ height: 100 }} />
                            </Form.Item>

                            <Form.Item
                                label="Thực hiện món ăn"
                                name="make"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập cách thực hiện món ăn',
                                    },
                                ]}
                            >
                                <TextArea placeholder="Thực hiện món ăn" style={{ height: 100 }} />
                            </Form.Item>

                            <Form.Item
                                label="Hình ảnh, công thức món ăn"
                                name="image"
                            >
                                {showUpload === false ? (
                                    <Image width="100%" src={imgURL} />
                                ) : (
                                    <Upload.Dragger
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={handleUploadCoverImg}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Hình ảnh, công thức món ăn
                                        </p>
                                    </Upload.Dragger>
                                )}
                            </Form.Item>

                            {showUpload === false && (
                                <Button
                                    danger
                                    type="primary"
                                    className="btn-delete-img"
                                    onClick={handleDeleteImg}
                                >
                                    Xóa ảnh
                                </Button>
                            )}

                            <Form.Item
                                name="isFree"
                                valuePropName="checked"
                            >
                                <Checkbox onChange={handleChangeCheckbox}>Món ăn miễn phí</Checkbox>
                            </Form.Item>

                            <div className="wrap--btn">
                                <Button
                                    type="primary"
                                    icon={<CompassFilled />}
                                    size="large"
                                    htmlType="submit"
                                >
                                    Cập nhật món ăn
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodUpdate;
