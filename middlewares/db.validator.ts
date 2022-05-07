import { ObjectId } from "mongoose";
import userModel from "../models/user.model";

export const existsEmail = async (email: String) => {
  const emailExists = await userModel.findOne().where({ email });
  if (emailExists) {
    throw new Error(`${email} have another account, please login`);
  }
};

export const existsUser = async (id: ObjectId) => {
  const userExists = await userModel.findById(id);
  if (!userExists || !userExists.state) {
    throw new Error(`User with ID ${id} does not exists`);
  }
};
