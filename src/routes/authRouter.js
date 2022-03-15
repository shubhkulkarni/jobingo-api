const express = require("express");

const authRouter = express.Router();

authRouter.route("/signup").get((req, res, next) => {
  res.send("Signing up");
});

module.exports = authRouter;
