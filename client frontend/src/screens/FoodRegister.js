import { useCallback } from "react";
import Header from "../components/Header";
import { Button, Checkbox, Form, Input, InputNumber, Select, Upload } from 'antd';
import { InboxOutlined, CompassFilled } from '@ant-design/icons';
import { convertToBase64 } from "../utils/convert";


const FoodRegister = () => {
    const [form] = Form.useForm();
    
    const handleRegisterFood = useCallback((values) => {
        console.log('values', values);
    }, [])
    // Xử lí upload hình ảnh ở đây nhớ thêm state để lưu chuỗi mã hóa hình ảnh (certification)
    const handleChangeImage = async (e) => {
        const base64 = await convertToBase64(e);
        // setCertification(base64);
    }
    return (
        <>
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
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập loại món ăn',
                                    },
                                ]}
                            >
                                <Input placeholder="Loại món ăn" />
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
                                <Select 
                                    placeholder="Thời lượng" 
                                    options={[
                                        { value: 'jack', label: 'Jack' },
                                        { value: 'lucy', label: 'Lucy' },
                                        { value: 'Yiminghe', label: 'yiminghe' },
                                    ]}
                                />
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

                            <div className="double--columns">
                                <Form.Item
                                    label="Tên nguyên liệu"
                                    name="material_name"
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
                                    label="Số lượng"
                                    name="count"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập số lượng nguyên liệu',
                                        },
                                    ]}
                                >
                                    <InputNumber placeholder="Số lượng nguyên liệu" />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="Cách chế biến"
                                name="method"
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
                                label="Cam kết"
                                name="commit"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập cam kết',
                                    },
                                ]}
                            >
                                <Input placeholder="Cam kết" />
                            </Form.Item>

                            <Form.Item
                                label="Hình ảnh, công thức món ăn"
                                name="images"
                            >
                                <Upload.Dragger
                                    listType="picture"
                                    accept="image/*"
                                    valuePropName="fileList"
                                    getValueFromEvent={handleChangeImage}
                                    
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Hình ảnh, công thức món ăn
                                    </p>
                                </Upload.Dragger>
                            </Form.Item>

                            <Form.Item
                                name="rule"
                            >
                                <Checkbox>Bạn có cam kết về điều khoản cũng như hợp đồng của chúng tôi không</Checkbox>
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