import { Router } from "express";
import { loginValidation, registerValidation, tokenValidation } from "../validations/auth.Validation.js";
import { authController } from "../controllers/auth.Controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import passport from "passport";


const authRouter = Router();

authRouter.post("/register", registerValidation, authController.registerUserController);

authRouter.get("/verify/:token", tokenValidation, authController.verifyAccountController);

authRouter.post("/login", loginValidation, authController.loginUserController)

authRouter.get("/me", authUser, authController.getMeController);

authRouter.post("/logout", authUser, authController.logoutUserController);




// Google Auth Routes

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", session: false }), authController.googleLoginController);


export default authRouter;