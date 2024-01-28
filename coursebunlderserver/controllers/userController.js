import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  //   const file= req.file

  if (!name || !email || !password)
    return next(new ErrorHandler("Please Add All Fields", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Registerd", 409));
  //Upload File on Cloudinary

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempId",
      url: "tempUrl",
    },
  });
  sendToken(res, user, "Registerd Succesfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please Add All Fields", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("User Doesn't Exist", 401));
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or  Password", 401));
  sendToken(res, user, `Welcome back ${user.name}`, 200);
});
