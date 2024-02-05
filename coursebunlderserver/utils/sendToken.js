export const sendToken = (res, user, message, statusCode = 200) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly:true,
    maxAge:3600000*5,
    secure:true,
    sameSite:'none',
    domain: '.vercel.app'
   
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
    token
  });
};
