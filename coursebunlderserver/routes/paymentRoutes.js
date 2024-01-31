import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { buySubscription } from "../controllers/paymentController.js";

const router = express.Router();
//Buy Subscription

router.route("/subscribe").get(isAuthenticatedUser,buySubscription)
export default router;
