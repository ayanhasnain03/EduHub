import express from "express";
import { authorizeAdmin, isAuthenticatedUser } from "../middlewares/auth.js";
import { contact, courseRequest } from "../controllers/otherController.js";

const router = express.Router();
//contact form
router.route("/contact").post(contact);

//Request  from
router.route("/courserequest").post(courseRequest);

//Get Admin Dashboards stats
router.route("/admin/stats").get(isAuthenticatedUser,authorizeAdmin)
export default router;
