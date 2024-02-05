// export const sendToken = (res,user,message,statusCode = 200)=>{
//     const token = user.getJWTToken();
//     const options={
//         expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//         httpOnly:true,
//         secure:true,
//         sameSite:"none",
//     }
//     res.status(statusCode).cookie("token",token,options).json({
//         success:true,
//         message,
//         user,
//     })
// }

//Creating token and saving in cookie

export  const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();

    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user, 
        token
    });
};

