import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import {User} from "../models/User.js"
import { sendToken } from "../utils/sendToken.js";
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  //   const file= req.file

 
   
let user = await User.findOne({email})

if(user) return next(new ErrorHandler("User Already Registerd",409));
//Upload File on Cloudinary

user = await User.create({
    name,email,password,
    avatar:{
        public_id:"tempId",
        url:"tempUrl"
    }
})
sendToken(res,user,"Registerd Succesfully",201)
});
