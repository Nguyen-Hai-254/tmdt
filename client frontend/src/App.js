import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import ShopSectionCategory from "./components/homeComponents/ShopSectionByCategory";
import StudentRegister from "./screens/Register_Student";
import ChefRegister from "./screens/Register_Chef";
import Register from "./screens/Register";
import FoodRegister from "./screens/FoodRegister";
import FoodUpdate from "./screens/FoodUpdate";
import FoodCourseRegister from "./screens/FoodCourseRegister";
import CourseManagement from "./screens/Chef/CourseManagement";
import FoodManagement from "./screens/Chef/FoodManagement";
import FoodDetail from "./screens/Chef/FoodDetail"
import AddFoodToCourse from "./screens/AddFoodToCourse";
import CourseManagementByAdmin from "./screens/Admin/CourseManagementByAdmin";
import CouseDetail from "./screens/CouseDetail";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pagenumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/category/:id" component={ShopSectionCategory} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/student/register" component={StudentRegister} />
        <Route path="/chef/register" component={ChefRegister} />
        <PrivateRouter path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <PrivateRouter path="/shipping" component={ShippingScreen} />
        <PrivateRouter path="/payment" component={PaymentScreen} />
        <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
        <PrivateRouter path="/food-register" component={FoodRegister} />
        <PrivateRouter path="/food-update" component={FoodUpdate} />
        <PrivateRouter path="/food-course-register" component={FoodCourseRegister} />
        <PrivateRouter path="/add-food-to-course/:courseId" component={AddFoodToCourse} />
        <PrivateRouter path="/order/:id" component={OrderScreen} />
        <PrivateRouter path="/course/:id" component={CouseDetail} />


        <PrivateRouter path="/chef" component={CourseManagement} />
        <PrivateRouter path="/all-food" component={FoodManagement} />
        <PrivateRouter path="/food/:id" component={FoodDetail} />
        
        {/* admin */}
        <PrivateRouter path="/admin/course" component={CourseManagementByAdmin} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
