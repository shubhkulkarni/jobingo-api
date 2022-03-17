const express = require("express");
const { signup, signin, signout } = require("../controllers/user");

const authRouter = express.Router();

authRouter.route("/signup").post(signup);

authRouter.route("/signin").post(signin);

authRouter.route("/signout").get(signout);

module.exports = authRouter;
