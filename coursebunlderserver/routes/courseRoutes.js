import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, authorizeSubscribers, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();
//Get All courses withought lectures
router.route("/courses").get(getAllCourses);
//Create new courses -only Admin
router
  .route("/createcourse")
  .post(isAuthenticatedUser, authorizeAdmin, singleUpload, createCourse);

// Add lecture, Delete Course, Get Course Details
router
  .route("/course/:id")
  .get(isAuthenticatedUser,authorizeSubscribers, getCourseLectures)
  .post(isAuthenticatedUser, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticatedUser,authorizeAdmin,deleteCourse)

//Delete Lecture

router.route("/deletelecture").delete(isAuthenticatedUser,authorizeAdmin,deleteLecture)
export default router;
