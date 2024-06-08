import express from "express";
import { protect } from "../Middleware/AuthMiddleware.js";
import FoodController from "../controllers/foodController.js";

const foodRouter = express.Router();

//chef
foodRouter.post('/create-food', protect, FoodController.handleCreateFood);
foodRouter.get('/get-all-food-by-chef', protect, FoodController.handleGetAllFoodByChef);
foodRouter.get('/get-food-by-chef', protect, FoodController.handleGetFoodById);
foodRouter.put('/update-food-by-chef', protect, FoodController.handleEditFoodByChef);
foodRouter.get('/search-food-by-chef', protect, FoodController.handleSearchFoodByChef);

//user
foodRouter.get('/get-food-by-id', FoodController.handleGetFoodById);


export default foodRouter;