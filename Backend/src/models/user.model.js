import mongoose from "mongoose";
import { compare, hash } from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    role: {
        type: String,
        default: "buyer",
        enum: ["buyer", "seller"],
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false,
        select: false
    },
    verifyToken: {
        type: String,
        select: false
    },
    verifyTokenExpires: {
        type: Date,
        select: false,
    }

}, { timestamps: true })

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
}

export const userModel = new mongoose.model("User", userSchema);