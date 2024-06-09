import React, { useEffect, useMemo, useState } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "./../Redux/Actions/cartActions";
import { getCart } from "../api/orderApi";
import { getCourseById } from "../api/courseApi";
import { Checkbox, CircularProgress, Container } from "@mui/material";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const [cartItems, setCartItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  const total = cartItems?.orderItems?.length || 0;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  useEffect(() => {
    setIsLoading(true);
    getCart()
      .then((res) => {
        setCartItems(res);
        // res.data.forEach((item) => {
        //   getCourseById(item.product).then((res) => {
        //     orderItems.push({
        //       qty: item.qty,
        //       price: res.data.price,
        //       name: res.data.name,
        //       product: res.data._id,
        // })
        // getCourseById
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };

  const handleSelectItem = (e, cartItem) => {
    if (e.target.checked) {
      setSelectedItem([...selectedItem, cartItem]);
    } else {
      setSelectedItem(selectedItem.filter((item) => item._id !== cartItem._id));
    }
  };

  const calculateTotalPrice = useMemo(() => {
    console.log("selectedItem", selectedItem);
    let total = 0;
    selectedItem?.forEach((item) => {
      total += item?.price || 0;
    });
    return total;
  }, [selectedItem]);

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
      {/* Cart */}
      <div className="container">
        {total === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Giỏ hàng của bạn trống không!!
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              MUA HÀNG NGAY
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Tổng số khóa học đã chọn
              <Link className="text-success mx-2" to="/cart">
                ({selectedItem.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems?.orderItems?.map((item) => (
              <div className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandle(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/course/${item._id}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                {/* <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>SỐ LƯỢNG</h6>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>GIÁ</h6>
                  <h4>{item.price}Đ</h4>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <Checkbox onChange={(e) => handleSelectItem(e, item)} />
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">Tổng tiền:</span>
              <span className="total-price">{calculateTotalPrice}Đ</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Tiếp tục mua hàng</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Thanh toán</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
