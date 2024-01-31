import { catchAsyncError } from "../middlewares/catchAsyncError.js";

import { User } from "../models/User.js";

import ErrorHandler from "../utils/errorHandler.js";

import { instance } from "../server.js";

import crypto from "crypto";
import { Payment } from "../models/Payment.js";

export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role === "admin")
    return next(new ErrorHandler("Admin can't buy subscription", 400));

  const plan_id = process.env.PLAN_ID || "plan_NVELuM2tYfVHed";

  const subscription = await instance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    total_count: 12,
  });

  user.subscription.id = subscription.id;

  user.subscription.status = subscription.status;

  await user.save();
  res.status(201).json({
    success: true,
    subscriptionId: subscription.id,
  });
});

// Test On Fronted later
export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_signature, razorpay_payment_id, razorpay_subscription_id } =
    req.body;
  const user = await User.findById(req.user._id);

  const subscription_id = user.subscription.id;
  const genrated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
    .digest("hex");
  const isAuthentic = genrated_signature === razorpay_signature;

  if (!isAuthentic)
    return res.redirect(`${process.env.FRONTEND_URL}/paymentfaild`);

  // database comes here
  await Payment.create({
    razorpay_signature,
    razorpay_payment_id,
    razorpay_subscription_id,
  });
  user.subscription.status = "active";

  await user.save();

  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
  );
});

export const getRazorPayKey = catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        key:process.env.RAZORPAY_API_KEY,
    })
})
