import { Request, Response } from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import entryModel from "../models/entry.model";
import userModel from "../models/user.model";

export const handleGetAllEntries = async (req: Request, res: Response) => {
  try {
    const [amountEntries, userEntries] = await Promise.all([
      entryModel.countDocuments().where({ state: true }),
      entryModel.find().where({ state: true }).populate("user"),
    ]);
    res.status(200).json({
      msg: "These are the Entries",
      amount: amountEntries,
      entries: userEntries,
    });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
  }
};

export const handleGetUserEntries = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userEntries = await userModel.findById(id).populate("entries");
    res.status(200).json({ msg: `Your Entries`, user: userEntries });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
    console.log("Errors", error);
  }
};

export const handleCreateEntries = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { img, title, body, categories } = req.body;
  try {
    const ID = uuidv4();
    const entry = new entryModel({
      _id: ID,
      img,
      title,
      body,
      categories,
      created: new Date(),
      user: id,
    });
    await entry.save();
    const userFound = await userModel.findByIdAndUpdate(id, {
      $push: { entries: ID },
    });
    res
      .status(200)
      .json({ msg: "Entry created successfully", user: userFound });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
    console.log(error);
  }
};

export const handleUpdateEntries = async (req: Request, res: Response) => {
  const { entryID } = req.params;
  const { img, title, body, categories } = req.body;

  try {
    await entryModel.findOneAndUpdate(
      { _id: entryID },
      {
        img,
        title,
        body,
        categories,
        updated: new Date(),
      }
    );

    res.status(200).json({ msg: "Entry modified successfully" });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
  }
};

export const handleDeleteEntries = async (req: Request, res: Response) => {
  const { id, entryID } = req.params;
  try {
    await entryModel.findOneAndUpdate(
      { _id: entryID },
      {
        state: false,
      }
    );
    res.status(200).json({ msg: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
  }
};
