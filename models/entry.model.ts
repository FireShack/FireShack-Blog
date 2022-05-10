import { model, Schema } from "mongoose";
import { userEntries } from "../interfaces/entry.interfaces";

const Entry = new Schema<userEntries>({
  _id: {
    type: String,
    required: true,
  },
  categories: {
    type: [],
    required: true,
  },
  img: {
    type: String,
    required: false,
    default:
      "https://images.unsplash.com/photo-1651870364199-fc5f9f46ac85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  title: {
    type: String,
    required: true,
    default: "Write your first entry",
  },
  body: {
    type: String,
    required: true,
    default: "",
  },
  comments: {
    type: [],
    required: false,
    default: [],
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model<userEntries>("Entry", Entry);
