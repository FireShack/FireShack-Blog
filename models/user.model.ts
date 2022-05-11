import { Schema, model } from "mongoose";
import { userModel } from "../interfaces/user.interfaces";

const User = new Schema<userModel>({
  img: {
    type: String,
    required: false,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  role: {
    type: String,
    required: true,
    enum: ["USER_ROLE", "ADMIN_ROLE"],
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    required: false,
    default: false,
  },
  loggined: {
    type: Boolean,
    required: false,
    default: false,
  },
  session_id: {
    type: String,
    required: false,
    default: "",
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  entries: {
    type: [String],
    default: [],
    ref: "Entry",
  },
  friends: {
    type: [String],
    default: [],
    ref: "User",
  },
});

export default model<userModel>("User", User);
