import express from "express";
import { changePassword, getMyProfile, login, logout, register } from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();
//Register
router.route("/register").post(register);

//login
router.route("/login").post(login);

//logout
router.route("/logout").post(logout);

//Get My Profile
router.route("/me").get(isAuthenticatedUser,getMyProfile);

//changePassword
router.route("/changepassword").put(isAuthenticatedUser,changePassword);



export default router;
