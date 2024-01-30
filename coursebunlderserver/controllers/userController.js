import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { Course } from "../models/Course.js";
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

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged Out",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please Add All Fields", 400));

  const user = await User.findById(req.user._id).select("+password");
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) return next(new ErrorHandler("Incorrect Old Passowrd ", 401));
  user.password = newPassword;
  user.save();
  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user._id).select("+password");
  if (name) user.name = name;
  if (email) user.email = email;
  user.save();
  res.status(200).json({
    success: true,
    message: "Profile Updated",
  });
});

export const updateprofilepicture = catchAsyncError(async (req, res, next) => {
  // Cloudinary
  res.status(200).json({
    success: true,
    message: "Profile Picture Upload Successfully",
  });
});

export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("User Not Found", 400));
  const resetToken = await user.getResetToken();
  await user.save()
  //Send token via email
  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  const message = `Click on the link to reset your password.${url}. if you have not requested then please ignore`;
  await sendEmail(user.email, "CourseBundler REset Password", message);
  res.status(200).json({
    success: true,
    message: `Reset Token has been sent to ${user.email}`,
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
const {token} = req.params;

const resetPasswordToken = crypto
.createHash("sha256")
.update(token)
.digest("hex");

const user = await User.findOne({
  resetPasswordToken,
  resetPasswordExpire:{
    $gt:Date.now(),
  },
})
if(!user) return next(new ErrorHandler("Token is Invaild and has been expired"))

user.password=req.body.password;

user.resetPasswordExpire=undefined;
user.resetPasswordToken=undefined;

await user.save();

  res.status(200).json({
    success: true,
    message: "Password Change Successfully",
  });
});



export const addToPlaylist = catchAsyncError(async (req, res, next) => {
const user = await User.findById(req.user._id)
const course =await Course.findById(req.body._id)

if(!course) return next(new ErrorHandler("Invaild Course Id",404))

const itemExist = user.playlist.find((item)=>{
  if(item.course.toString() === course._id.toString()) return true;
})
if(itemExist) return next(new ErrorHandler("Item Already Exist",409))
user.playlist.push({
  course:course._id,
  poster:course.poster.url,
})

await user.save()

  res.status(200).json({
    success: true,
    message: "Added To Playlist",
  });
});

export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id)
  const course =await Course.findById(req.query.id)
  
  if(!course) return next(new ErrorHandler("Invaild Course Id",404))
  
  //Items Doesen't Matches
const newPlaylist = user.playlist.filter(item=>{
  if(item.course.toString() !==course._id.toString()) return item;
})
user.playlist=newPlaylist
  
  await user.save()
  
    res.status(200).json({
      success: true,
      message: "Remove from Playlist",
    });
  });
