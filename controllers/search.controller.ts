import { Request, Response } from "express";
import entryModel from "../models/entry.model";
import userModel from "../models/user.model";

export const handleSearchEntries = async (req: Request, res: Response) => {
  const { params } = req.params;
  try {
    // Search the user's title, body or categories. This is not key sensitive.
    const regEx = new RegExp(params, "i");
    const entries = await entryModel.find({
      $or: [{ title: regEx }, { body: regEx }, { categories: regEx }],
    });

    res.status(200).json({
      msg: "Your search results",
      entries,
    });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong", error });
  }
};

export const handleSearchUsers = async (req: Request, res: Response) => {
  const { params } = req.params;
  try {
    // Search the user's name or mail. This is not key sensitive.
    const regEx = new RegExp(params, "i");
    const findUserByName = await userModel.find({
      $or: [{ name: regEx }, { email: regEx }],
    });
    res.status(200).json({
      msg: "Your search results",
      users: findUserByName,
    });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong", error });
  }
};
