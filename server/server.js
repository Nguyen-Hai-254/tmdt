import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import discountRoute from "./Routes/discountRoutes.js";
import categoriesRoute from "./Routes/categoriesRoutes.js";
import foodRouter from "./Routes/foodRoutes.js";
import courseRouter from "./Routes/courseRoutes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/discount", discountRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/food", foodRouter);
app.use("/api/course", courseRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);
console.log(process.env);
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`server run in port ${PORT}`));
