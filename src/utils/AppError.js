class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = "error";
    this.statusCode = statusCode || 500;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
