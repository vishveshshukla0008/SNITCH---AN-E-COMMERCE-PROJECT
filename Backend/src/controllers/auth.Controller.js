import { userModel } from "../models/user.model.js";
import {
  sendVerificationConfirmationEmail,
  sendVerificationTokenEmail,
} from "../services/auth.Service.js";
import { AppError } from "../utils/AppError.js";
import { AsyncWrapper } from "../utils/AsyncWrapper.js";
import { generateToken } from "../utils/jwt.Utils.js";
import { getRedis } from "../config/cache.js";
import { config } from "../config/config.js";

const registerUserController = AsyncWrapper(async (req, res) => {
  const { email, contact, fullname, password, role } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ email }, { contact }],
  });

  if (isUserExist) {
    throw new AppError(409, "User already exists !");
  }

  const user = await userModel.create({
    email,
    contact,
    fullname,
    password,
    role,
    authProvider: "local",
  });

  await sendVerificationTokenEmail(user);

  return res
    .status(201)
    .json({
      success: true,
      message: "Verification link has been sent on given email !",
    });
});

const verifyAccountController = AsyncWrapper(async (req, res) => {
  const { token } = req.params;

  const user = await userModel
    .findOne({ verifyToken: token })
    .select("+role +verifyTokenExpires +isVerified");

  if (!user) throw new AppError(404, "Account does not exist !");
  if (user.isVerified) throw new AppError(400, "Account already Verified !");
  if (user.verifyTokenExpires < Date.now()) {
    await userModel.deleteOne({ _id: user._id });
    throw new AppError(400, "Token Expired ! Please signup again !");
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpires = undefined;

  await user.save();
  await sendVerificationConfirmationEmail(user);

  return res
    .status(200)
    .json({
      success: true,
      message: "Account Verified Successfully ! Now you can login !",
    });
});

const loginUserController = AsyncWrapper(async (req, res) => {
  const { identifier, password } = req.body;
  let user = await userModel
    .findOne({
      $or: [{ email: identifier }, { contact: identifier }],
    })
    .select("+password +isVerified +role");

  if (!user) throw new AppError(404, "User does not exist !");
  if (!user.isVerified)
    throw new AppError(
      401,
      "Account not verified ! please verify your account first !",
    );

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) throw new AppError(401, "Invalid Credentials !");

  const token = generateToken({ userId: user._id, email: user.email });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  user = user.toObject();
  delete user.password;
  delete user.isVerified;


  return res
    .status(200)
    .json({ success: true, message: "Login successfully !", user });
});

const getMeController = AsyncWrapper(async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json({ success: true, message: "User fetched successfully !", user });
});

const logoutUserController = AsyncWrapper(async (req, res) => {
  const token = req.cookies.token;
  const redis = await getRedis();

  await redis.set(`blacklisted:${token}`, "true", "EX", 7 * 24 * 60 * 60);
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "Logout successfully !" });
});

// Google Login Controller :

const googleLoginController = AsyncWrapper(async (req, res) => {
  try {
    let googleUser = req.user;
    const email = googleUser.emails[0].value;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        email,
        fullname: googleUser.displayName,
        avatar: googleUser.photos[0].value,
        authProvider: "google",
        isVerified: true,
        googleId: googleUser?.id,
      });
    }

    const token = generateToken({ userId: user._id, email: user.email });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user = user.toObject();
    delete user.password;
    delete user.role;
    delete user.isVerified;

    return res.redirect(`${config.FRONTEND_URL}`);
  } catch (error) {
    console.log("error in googleLoginController", error);
    throw new AppError(500, "Internal Server Error !");
  }
});

export const authController = {
  registerUserController,
  loginUserController,
  verifyAccountController,
  getMeController,
  logoutUserController,
  googleLoginController,
};
