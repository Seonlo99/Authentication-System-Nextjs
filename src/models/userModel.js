import { verify } from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provided a username"],
    unquie: true,
  },
  email: {
    type: String,
    required: [true, "Please provided an email"],
    unquie: true,
  },
  password: {
    type: String,
    required: [true, "Please provided a password"],
  },
  role: {},
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
