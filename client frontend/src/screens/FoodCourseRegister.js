import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { Button, Checkbox, Form, Input, InputNumber, Select, Upload } from 'antd';
import { InboxOutlined, CompassFilled } from '@ant-design/icons';
import { convertToBase64 } from "../utils/convert";
import axios from 'axios';

const FoodCourseRegister = () => {
    const [form] = Form.useForm();
    const [certification, setCertification] = useState("");
    const handleRegisterFoodCourse = useCallback(async (values) => {
        try {
            const response = await axios.post('/api/course/create-course', {
                ...values,
                image: certification // Gửi ảnh dưới dạng base64
            });
            console.log('Course created successfully', response.data);
        } catch (error) {
            console.error('Failed to create course', error);
        }
    }, [certification]);
    
    const handleChangeImage = async (e) => {
        const base64 = await convertToBase64(e);
        setCertification(base64);
    }

    return (
        <>
            <Header />
            <div className="food-course-register--wrapper">
                <erFoodCourse}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Tên khóa học"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập tên khóa học',
                                    },
                                ]}
                            >
                                <Input placeholder="Tên khóa học" />
                            </Form.Item>

                            <Form.Item
                                label="Loại khóa học"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập loại khóa học',
                                    },
                                ]}
                            >
                                <Input placeholder="Loại khóa học" />
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
                                label="Mô tả chi tiết khóa học"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập mô tả chi tiết khóa học',
                                    },
                                ]}
                            >
                                <Input placeholder="Mô tả chi tiết khóa học" />
                            </Form.Item>

                            <Form.Item
                                label="Giá khóa học"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập giá khóa học',
                                    },
                                ]}
                            >
                                <Input placeholder="Giá khóa học" />
                            </Form.Item>

                            <Form.Item
                                label="Cam kết"
                                name="commitment"
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
                                label="Hình ảnh, công thức khóa học"
                                name="images"
                            >
                                <Upload.Dragger
                                    listType="picture-card"
                                    onChange={handleChangeImage}
                                    
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Hình ảnh, công thức khóa học
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
                                    Thêm khóa học
                                </Button>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FoodCourtRegister;
