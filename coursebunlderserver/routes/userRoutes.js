import express from "express";
import {
    addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateUserRole,
  updateprofilepicture,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticatedUser } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js"

const router = express.Router();
//Register
router.route("/register").post(singleUpload,register);

//login
router.route("/login").post(login);

//logout
router.route("/logout").post(logout);

//Get My Profile
router.route("/me").get(isAuthenticatedUser, getMyProfile);

//Delete My Profile 
router.route("/me").delete(isAuthenticatedUser, deleteMyProfile);

//changePassword
router.route("/changepassword").put(isAuthenticatedUser, changePassword);

//update Profile
router.route("/updateprofile").put(isAuthenticatedUser, updateProfile);

//update Picture
router.route("/updateprofilepicture").put(isAuthenticatedUser,singleUpload,updateprofilepicture);

//ForgetPassword
router.route("/forgetpassword").post(forgetPassword);

//Reset Password
router.route("/resetpassword/:token").put(resetPassword);

//Add To PlayList
router.route("/addtoplaylist").post(isAuthenticatedUser,addToPlaylist);

//REmove From PlayList
router.route("/removefromplaylist").delete(isAuthenticatedUser,removeFromPlaylist);

//Admin ROutes

router.route("/admin/users").get(isAuthenticatedUser,authorizeAdmin,getAllUsers)

router.route("/admin/user/:id").put(isAuthenticatedUser,authorizeAdmin,updateUserRole)
.delete(isAuthenticatedUser,authorizeAdmin,deleteUser)

export default router;
