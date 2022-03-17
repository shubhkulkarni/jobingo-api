const express = require("express");
const { signup } = require("../controllers/user");

const authRouter = express.Router();

authRouter.route("/signup").post(signup);

module.exports = authRouter;
