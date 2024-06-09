import mongoose from "mongoose";
import { foodKindEnum } from "../utils/enum.js";


// Đánh giá về món ăn
const reviewSchema = mongoose.Schema(
    {
        rating: { type: Number, required: true }, //số sao
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const foodSchema = mongoose.Schema(
    {
        name: { type: String, required: true }, //tên món ăn
        image: { type: String, require: true },
        video: { type: String },
        description: { type: String, }, // mô tả món ăn
        time: { type: String, }, // thời gian nấu món ăn
        ingredient: [{ type: String, require: true }], // nguyên liệu
        processing: [{ type: String, require: true }], // sơ chế
        make: [{ type: String, require: true }], // thực hiện món ăn
        reviews: [reviewSchema],
        active: {
            type: Boolean,
            default: true,
        },
        kind: { // Phân loại theo pp chế biến: Xào, luộc...
            type: String,
            enum: foodKindEnum,
            default: foodKindEnum.other
        },
        isFree: { type: Boolean, require: true, default: false },
        view: { type: Number, default: 0 },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
