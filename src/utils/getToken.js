const jwt = require("jsonwebtoken");
exports.getToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1h"
  });
};
