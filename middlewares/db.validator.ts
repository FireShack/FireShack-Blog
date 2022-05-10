import { ObjectId } from "mongoose";
import entryModel from "../models/entry.model";
import userModel from "../models/user.model";

export const existsEmail = async (email: string) => {
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

export const existsEntry = async (entryID: string) => {
  const entryExists = await entryModel.findOne({ entry_id: entryID });
  if (!entryExists || !entryExists) {
    throw new Error(`Entry with ID ${entryID} does not exists`);
  }
};
