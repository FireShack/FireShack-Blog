import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model";
import { generateToken } from "../helpers/generate.jwt";
import { v4 as uuidv4 } from "uuid";

export const handleLogin = async (req: Request, res: Response) => {
  const { email, pass } = req.body;
  try {
    const sessionID = uuidv4();

    const userFound = await userModel.findOne({ email });

    if (!userFound || !userFound.state) {
      return res.status(400).json({ msg: `${email} is not registered` });
    }
    const validPassword = bcrypt.compareSync(pass, userFound.pass);
    if (!validPassword) {
      return res.status(200).json({ msg: "Please, check your password" });
    }
    const jwt = await generateToken(userFound.id);
    await userFound.updateOne({
      loggined: true,
      session_id: sessionID,
    });

    res
      .status(200)
      .json({
        msg: `User ${email} loggined successfully`,
        jwt,
        user: userFound,
      });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    console.log(error);
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userFound = await userModel.findByIdAndUpdate(id, {
      loggined: false,
      session_id: "",
    });

    if (!userFound) {
      return res.status(400).json({ msg: `${id} is wrong` });
    }

    res.status(200).json({ msg: `User ${id} loggined out successfully` });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};
