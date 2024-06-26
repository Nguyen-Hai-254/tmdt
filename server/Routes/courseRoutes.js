import express from "express";
import { protect } from "../Middleware/AuthMiddleware.js";
import CourseController from "../controllers/courseController.js";

const courseRouter = express.Router();

//chef
courseRouter.post('/create-course', protect, CourseController.handleCreateCourse);
courseRouter.get('/get-all-course-by-chef', protect, CourseController.handleGetAllCourseByChef);
courseRouter.get('/get-course-by-chef', protect, CourseController.handleGetCourseByChef);
courseRouter.put('/update-course-by-chef', protect, CourseController.handleEditCourseByChef);
courseRouter.post('/add-food-to-course', protect, CourseController.handleAddFoodToCourse);

//user
courseRouter.get('/get-course-by-id', CourseController.handleGetCourseById);
courseRouter.get('/get-course-by-category', CourseController.handleGetCourseByCategory);
courseRouter.get('/get-all-course', CourseController.handleGetAllCourse);

//admin
courseRouter.get('/get-all-course-by-admin', protect, CourseController.handleGetAllCourseByAdmin);
courseRouter.put('/approval-course-by-admin', protect, CourseController.handleApprovalCourseByAdmin);
courseRouter.get('/get-course-by-admin', protect, CourseController.handleGetCourseByAdmin);

export default courseRouter;