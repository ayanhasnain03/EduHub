import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { buySubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();
//Buy Subscription
router.route("/subscribe").get(isAuthenticatedUser,buySubscription)

//Verify Payment And Save
router.route("/paymentverification").post(isAuthenticatedUser,paymentVerification)

//Get Payment Key
router.route("/razorpaykey").get(getRazorPayKey)
export default router;
