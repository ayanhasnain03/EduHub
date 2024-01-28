import express from "express";
import { changePassword, getMyProfile, login, logout, register, updateProfile } from "../controllers/userController.js";
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

//update Profile
router.route("/updateprofile").put(isAuthenticatedUser,updateProfile);



export default router;
