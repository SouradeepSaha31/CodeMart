import { Router } from "express";
import { buyerSignup, sellerSignup, login, logout } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js"


const userRouter = Router();

userRouter.route("/buyersignup").post(buyerSignup);
userRouter.route("/sellersignup").post(sellerSignup);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(isLoggedIn, logout);

export { userRouter };