const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const { getCookieOptions } = require("../utils/getCookieOptions");
const { getToken } = require("../utils/getToken");
const AppError = require("../utils/AppError");

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, confirmPassword, name, role } = req.body;
  if (role === "admin") {
    return next(new AppError("cannot apply for admin role", 400));
  }
  const newUser = await User.create({
    email,
    password,
    name,
    role,
    confirmPassword
  });
  const token = getToken({ id: newUser._id });
  res.cookie("jwt", token, getCookieOptions());
  res.status(201).json({
    status: "success",
    accessToken: token
  });
});
