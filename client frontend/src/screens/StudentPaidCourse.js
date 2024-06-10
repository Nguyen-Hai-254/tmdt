import { CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCart } from "../api/orderApi";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import NavBarForUser from "../components/Navbar/NavBarForUser";

export default function StudentPaidCourse() {
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getCart()
      .then((res) => {
        setCartItems(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  return (
    <>
      <Header />
      <NavBarForUser />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4">Khóa học của tôi</Typography>
        {cartItems?.orderItems?.map((item) => (
          <div className="cart-iterm row">
            <div className="cart-image col-md-3">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-text col-md-5 d-flex align-items-center">
              <Link to={`/student/course/details/${item._id}`}>
                <h4>{item.name}</h4>
              </Link>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
