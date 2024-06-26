import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { sexEnum, userRole } from "../utils/enum.js";

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        telephone: { type: String, required: true },
        sex: { type: String, default: sexEnum.other },
        avatar: { type: String, default: "./images/user.png" },
        isChef: {
            description: { type: String },
            certification: { type: String },
        },
        role: {
            type: String,
            required: true,
            default: userRole.student,
        },
    },
    {
        timestamps: true,
    }
);

// Login
userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

// Register
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
