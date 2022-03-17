const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: [true, "name is required"], minlength: 3 },
  email: {
    type: String,
    required: [true, "email is required"],
    minlength: 3,
    unique: [true, "email address already exists"],
    validate: [validator.isEmail, "invalid email address"],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 8,
    trim: true
  },
  confirmPassword: {
    type: String,
    required: [true, "confirm password is required"],
    trim: true,
    validate: {
      validator(val) {
        return val === this.password;
      },
      message: "passwords don't match"
    }
  },
  role: {
    type: String,
    enum: ["user", "admin", "employer"],
    default: "user"
  },
  accountStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  this.confirmPassword = undefined;
  next();
});

const User = model("User", userSchema);

module.exports = User;
