import { Response } from "express";
import { Request } from "express-validator/src/base";
import userModel from "../models/user.model";

export const handleLogin = async (req: Request, res: Response) => {
  const { email, pass } = req.body;
  try {
    const userFound = await userModel.findOne({ email });
    if (!userFound || !userFound.state) {
      return res.status(400).json({ msg: `${email} is not registered` });
    }
    if (pass !== userFound.pass) {
      return res.status(200).json({ msg: "Please, check your password" });
    }

    res.status(200).json({ msg: `User ${email} loggined successfully` });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};
