import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { login } from "./../Redux/Actions/userActions";
import { Button, Typography } from 'antd';
import { MailOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


const { Title } = Typography; 
const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <div className="login--container">
        <div className="register--photo">
          <Link to="/">
            <img src="./images/logo.png" alt="Logo" className="register--logo" />
          </Link>
          <img src="./images/registerbackground.png" alt="Register" className="register--photo-img" />
        </div>
        <div className="login--content">
          <div className="login--content--title">
            <Title level={2}>Đăng nhập</Title>
            <Title level={4}>Hoặc đăng ký <Link to='/register'>Tại đây</Link></Title>
          </div>
          <div className="login--content--form">
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <Loading />}
            <form
              className=""
              onSubmit={submitHandler}
            >
              <div className="login--content--form--email">
                <p className="email--icon">
                  <MailOutlined />
                </p>
                <input
                  type="text"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login--content--form--password">
                <p className="password-icon">
                  <LockOutlined />
                </p>

                <input
                  type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="password-icon">
                  {showPassword ? <EyeOutlined onClick={() => setShowPassword(!showPassword)} /> : <EyeInvisibleOutlined onClick={() => setShowPassword(!showPassword)} />}
                </p>
              </div>
              <Button 
                type="primary"
                size="large"
                htmlType="submit"
              >Đăng nhập</Button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default Login;
