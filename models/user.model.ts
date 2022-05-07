import { Schema, model } from "mongoose";
import { userModel } from "../interfaces/user.interfaces";
import { Entry } from "./entry.model";

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
    unique: true
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
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  entries: {
    type: [],
    default: [],
  },
});

export default model<userModel>("User", User);
