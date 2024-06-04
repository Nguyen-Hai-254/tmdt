import { Link } from "react-router-dom/cjs/react-router-dom"

import { Button, Typography } from 'antd';

const { Title, Text } = Typography; 
const Register = () => {
    return (
        <>
            <div className="register--container">
                <div className="register--photo">
                    <Link to="/">
                        <img src="./images/logo.png" alt="Logo" className="register--logo" />
                    </Link>
                    <img src="./images/registerbackground.png" alt="Register" className="register--photo-img" />
                </div>
                <div className="register--content">
                    <div className="register--content--title">
                        <Title level={3}>Đăng ký tham gia với chúng tôi</Title>
                    </div>
                    <div className="register--content--btn">
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                            >
                                <Link to='/student/register'>Với tư cách học viên</Link>
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                            >
                                <Link to='/chef/register'>Với tư cách người bán khóa học</Link>
                            </Button>
                    </div>
                    <Text >Bạn đã có tài khoản? Đăng nhập <Link to='/login'>Tại đây</Link></Text>
                    {/* <Link to='/chef/register'><Button variant="contained">Với tư cách người bán khóa học</Button></Link> */}
                </div>
            </div>
        </>
    )
}

export default Register