import mongoose from "mongoose";
import { compare, hash } from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },

        contact: {
            type: String,
            trim: true,
            unique: true,
            sparse: true,
            required: function () {
                return this.authProvider === "local";
            },
        },

        fullname: {
            type: String,
            required: true,
            trim: true,
        },

        googleId: {
            type: String,
            select: false,
            sparse: true,
            required: function () {
                return this.authProvider === "google";
            },
        },

        avatar: String,

        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },

        password: {
            type: String,
            trim: true,
            select: false,
            required: function () {
                return this.authProvider === "local";
            },
        },

        role: {
            type: String,
            default: "buyer",
            enum: ["buyer", "seller"],
            select: false,
        },

        isVerified: {
            type: Boolean,
            default: false,
            select: false,
        },

        verifyToken: {
            type: String,
            select: false,
        },

        verifyTokenExpires: {
            type: Date,
            select: false,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    if (!this.password) return next();

    this.password = await hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    if (!this.password) return false;
    return await compare(password, this.password);
};

export const userModel = mongoose.model("User", userSchema);