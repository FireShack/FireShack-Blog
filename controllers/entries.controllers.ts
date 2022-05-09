import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import userModel from "../models/user.model";

export const handleGetUserEntries = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userEntries = await userModel.findById(id);
    res.status(200).json({ msg: "These are the Entries", userEntries });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
  }
};

export const handleCreateEntries = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { img, title, body, categories } = req.body;
  try {
    const ID = uuidv4();

    const userFound = await userModel.findByIdAndUpdate(id, {
      $push: {
        entries: {
          id: ID,
          img,
          title,
          body,
          categories,
          state: true,
          created: new Date(),
        },
      },
    });

    res.status(200).json({ msg: "Entry created successfully", userFound });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
  }
};

export const handleUpdateEntries = async (req: Request, res: Response) => {
  const { id, entryID } = req.params;
  const { img, title, body, categories } = req.body;

  try {
    // const ID = uuidv4();
    await userModel.findByIdAndUpdate(id, {
      $pull: {
        entries: { id: entryID },
      },
    });
    const userUpd = await userModel.findByIdAndUpdate(id, {
      $push: {
        entries: {
          id: entryID,
          img,
          title,
          body,
          categories,
          state: true,
          created: new Date(),
        },
      },
    });

    res.status(200).json({ msg: "Entry modified successfully", userUpd });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
  }
};

export const handleDeleteEntries = async (req: Request, res: Response) => {
  const { id, entryID } = req.params;
  try {
    await userModel.findByIdAndUpdate(id, {
      $pull: {
        entries: { id: entryID },
      },
    });
    res.status(200).json({ msg: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
  }
};
