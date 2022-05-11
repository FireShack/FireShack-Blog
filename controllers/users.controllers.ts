import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model";

export const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const [amountUsers, allUsers] = await Promise.all([
      userModel.count().where({ state: true }),
      userModel.find().where({ state: true }),
    ]);

    return res.status(200).json({
      msg: "Here are the users",
      "Active users": amountUsers,
      users: allUsers,
    });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};

export const handleGetUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const oneUser = await userModel.findById(id);
    if (!oneUser) {
      return res.status(400).json({ msg: `There is no user with id ${id}` });
    }
    res
      .status(200)
      .json({ msg: "The user you are searching for", user: oneUser });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};

export const handlePostUsers = async (req: Request, res: Response) => {
  const { name, email, pass, role } = req.body;
  try {
    // Password Encryptation
    const salt = bcrypt.genSaltSync();
    const newPass = bcrypt.hashSync(pass, salt);

    const userToAdd = new userModel({ name, email, pass: newPass, role });
    await userToAdd.save();
    res.status(200).json({ msg: "User added", user: { name, email } });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};

export const handlePutUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const userToUpd = await userModel.findByIdAndUpdate(id, { name, email });
    res.status(200).json({ msg: "User updated successfully", user: userToUpd });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};

export const handleDeleteUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userToDelete = await userModel.findByIdAndUpdate(id, {
      state: false,
    });

    if (!userToDelete) {
      return res
        .status(400)
        .json({ msg: `The user with ID ${id} does not exists` });
    }

    userToDelete.update({
      state: false,
    });

    res.status(200).json({ msg: "User deleted", id });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};

export const handleFollowUsers = async (req: Request, res: Response) => {
  const { id, toId } = req.params;
  try {
    const user = await userModel.findById(id);
    if (user?.friends.includes(toId)) {
      return res
        .status(400)
        .json({ msg: `User ${id} already follow user ${toId}` });
    }
    await userModel.findByIdAndUpdate(id, {
      $push: { friends: toId },
    });

    res.status(200).json({ msg: "User followed", toId });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};

export const handleUnfollowUsers = async (req: Request, res: Response) => {
  const { id, toId } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user?.friends.includes(toId)) {
      return res
        .status(400)
        .json({ msg: `User ${id} doesn't follow user ${toId}` });
    }
    await userModel.findByIdAndUpdate(id, {
      $pull: { friends: toId },
    });

    res.status(200).json({ msg: "User unfollowed", toId });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};
