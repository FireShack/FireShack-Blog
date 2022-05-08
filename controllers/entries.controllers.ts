import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import userModel from "../models/user.model";

export const handleGetEntries = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ msg: "These are the Entries" });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
  }
};

export const handleCreateEntries = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { img, title, body, categories } = req.body;
  try {
    const ID = uuidv4();

    const userFound = await userModel.findById(id);

    await userFound?.update({
      $push: { entries: { id: ID, img, title, body, categories } },
    });

    res.status(200).json({ msg: "Entry created successfully", userFound });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
  }
};
