import express from "express"
import { createCourse, getAllCourses } from "../controllers/courseController.js"

const router = express.Router()
//Get All courses withought lectures
router.route("/courses").get(getAllCourses)
//Create new courses -only Admin
router.route("/createcourse").post(createCourse)

// Add lecture, Delete Course, Get Course Details

//Delete Lecture
export default router