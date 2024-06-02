import { Link } from "react-router-dom/cjs/react-router-dom"

import { Button, Typography } from 'antd';

const { Title } = Typography; 
const Register = () => {
    return (
        <>
            <div className="register--container">
                <div className="register--photo">
                    <img src="./images/registerbackground.png" alt="Register" className="register--photo-img" />
                </div>
                <div className="register--content">
                    <div className="register--content--title">
                        <Title level={2}>Đăng ký tham gia với chúng tôi</Title>
                        <Title level={4}>Đã có tài khoản?</Title>
                        <Title level={4}>Đăng nhập <Link to='/login'>Tại đây</Link></Title>
                    </div>
                    <div className="register--content--btn">
                        <div className="wrap--btn">
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                            >
                                <Link to='/student/register'>Với tư cách học viên</Link>
                            </Button>
                        </div>
                        <div className="wrap--btn">
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                            >
                                <Link to='/chef/register'>Với tư cách người bán khóa học</Link>
                            </Button>
                        </div>
                    </div>
                    {/* <Link to='/chef/register'><Button variant="contained">Với tư cách người bán khóa học</Button></Link> */}
                </div>
            </div>
        </>
    )
}

export default Register