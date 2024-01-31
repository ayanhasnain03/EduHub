import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticatedUser } from "../middlewares/auth.js";

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
  .get(isAuthenticatedUser, getCourseLectures)
  .post(isAuthenticatedUser, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticatedUser,authorizeAdmin,deleteCourse)

//Delete Lecture
export default router;
