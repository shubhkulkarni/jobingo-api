const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const sanitize = require("express-mongo-sanitize");
const { error } = require("./src/middlewares/error");
const AppError = require("./src/utils/AppError");
const router = require("./src/routes/router.config");
dotenv.config({ path: "./config.env" });
require("./database");
const app = express();
app.use(express.json());
app.use(error);
app.use(helmet());
app.use(sanitize());
router.forEach(({ path, router }) => {
  app.use("/api" + path, router);
});

app.all("*", (req, res, next) => {
  next(new AppError(`invalid url : ${req.originalUrl}`, 404));
});
const server = app.listen(process.env.PORT, () => {
  console.log("process is running on port " + process.env.PORT);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandledRejection :( exiting !");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("uncaughtException :( exiting !");
  server.close(() => {
    process.exit(1);
  });
});
