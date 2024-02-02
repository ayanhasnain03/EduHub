import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return next(new ErrorHandler("All fields are mandetory", 400));
  const to = process.env.MY_MAIL;
  const subject = "Contact from coursebundler";
  const text = `I Am ${name} and my Email is ${email}. \n ${message} `;
  await sendEmail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your Mesage Has Been Sent",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course)
    return next(new ErrorHandler("All fields are mandetory", 400));
  const to = process.env.MY_MAIL;
  const subject = "Course Request from coursebundler";
  const text = `I Am ${name} and my Email is ${email}. \n ${course} `;
  await sendEmail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your Request Has Been Sent",
  });
});

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});
