// export const sendToken = (res,user,message,statusCode = 200)=>{
//     const token = user.getJWTToken();
//     const options={
//         expires: new Date(Date.now()+15 * 24 * 60 * 60 * 1000),
//         httpOnly:true,
//        secure:true,
//         sameSite:"none",
//     }
//     res.status(statusCode).cookie("token",token,options).json({
//         success:true,
//         message,
//         user,
//     })
// }


// Create Token and saving in cookie

export const sendToken = (res,user,message,statusCode = 200)=>{
    const token = user.getJWTToken();
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token",token,options).json({
      success: true,
      user,
      token,
    });
  };
  
