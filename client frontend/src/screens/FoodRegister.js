import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Checkbox, Form, Image, Input, Select, Upload, message } from 'antd';
import { InboxOutlined, CompassFilled } from '@ant-design/icons';
import { foodKindEnum } from "../utils/enum";
import axios from "axios";


const FoodRegister = () => {
    const [form] = Form.useForm();
    const [isFree, setIsFree] = useState(false);
    const [imgURL, setImgURL] = useState('');
    const [certification, setCertification] = useState("");
    const [showUpload, setShowUpload] = useState(true);
    const [fileList, setFileList] = useState([]);

    const [messageApi, contextHolder] = message.useMessage();

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const success = useCallback(() => {
        messageApi.open({
          type: 'success',
          content: 'Tạo món ăn thành công',
        });
      }, [messageApi]);

    const handleChangeCheckbox = useCallback((e) => {
        setIsFree(e.target.checked);
    }, [])

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
        if(fileList.length <= 0) {
            return;
        }
        const base64 = await getBase64(fileList[0]?.originFileObj);
        setCertification(base64);
    }, [fileList])
    const options = Object.entries(foodKindEnum).map(([value, label]) => ({ value, label }));
    const handleRegisterFood = useCallback(async (values) => {
        const body = {
            ...values,
            isFree,
            image: certification,
        }
        console.log(certification);
        const url = 'http://localhost:5000/api/food/create-food';
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const response = await axios.post(url, body, config);
        if(response?.status === 200) {
            form.resetFields();
            success();
        }

    }, [certification, form, isFree, success])

    useEffect(() => {
        handleChangeImage()
    }, [handleChangeImage])

    return (
        <>
            {contextHolder}
            <Header />
            <div className="food-register--wrapper">
                <div className="container">
                    <h2 className="food-register--title">Thêm món ăn</h2>
                    <div className="food-register--form">
                        <Form
                            form={form}
                            name="add-new-food"
                            layout="vertical"
                            onFinish={handleRegisterFood}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Tên món ăn"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập tên món ăn',
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
                                        message:
                                            'Vui lòng nhập loại món ăn',
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
                                        message:
                                            'Vui lòng chọn thời lượng',
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
                                        message:
                                            'Vui lòng nhập mô tả chi tiết món ăn',
                                    },
                                ]}
                            >
                                <Input placeholder="Mô tả chi tiết món ăn" />
                            </Form.Item>

                            <Form.Item
                                label="Tên nguyên liệu"
                                name="ingredient"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập tên nguyên liệu',
                                    },
                                ]}
                            >
                                <Input placeholder="Tên nguyên liệu" />
                            </Form.Item>

                            <Form.Item
                                label="Cách chế biến"
                                name="processing"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập cách chế biến món ăn',
                                    },
                                ]}
                            >
                                <Input placeholder="Cách chế biến" />
                            </Form.Item>

                            <Form.Item
                                label="Thực hiện món ăn"
                                name="make"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập cách thực hiện món ăn',
                                    },
                                ]}
                            >
                                <Input placeholder="Thực hiện món ăn" />
                            </Form.Item>

                            <Form.Item
                                label="Hình ảnh, công thức món ăn"
                                name="image"
                            >
                                {showUpload === false ? (
                                    <Image width="100%" src={imgURL} />
                                ) : 
                                <Upload.Dragger
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleUploadCoverImg}
                                    // beforeUpload={handleBeforeUpload}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Hình ảnh, công thức món ăn
                                    </p>
                                </Upload.Dragger>}
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
                                    Thêm món ăn
                                </Button>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FoodRegister;