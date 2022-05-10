import { ObjectId } from "mongoose";

export interface userEntries {
  _id: string;
  categories: string[];
  img: string;
  title: string;
  body: string;
  comments: string[];
  state: boolean;
  user: ObjectId;
}
