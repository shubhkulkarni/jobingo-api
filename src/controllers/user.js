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
    accessToken: token,
    data: { email, name, id: newUser._id, role }
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("email or password is missing", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPasswords(password, user.password))) {
    return next(new AppError("invalid username password", 404));
  }
  const token = getToken({ id: user._id });
  res.cookie("jwt", token, getCookieOptions());
  res.status(200).json({
    status: "success",
    accessToken: token,
    data: { email, name: user.name, id: user._id, role: user.role }
  });
});

exports.signout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success"
  });
});
