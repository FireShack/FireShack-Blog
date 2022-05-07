import { Response } from "express";
import { Request } from "express-validator/src/base";
import userModel from "../models/user.model";

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let userFound: any;
    userFound = await userModel.findOne({ where: { email } });
    if (!userFound || !userFound.state) {
      return res.status(400).json({ msg: `${email} is not registered` });
    }
    if (password !== userFound.password) {
      return res.status(200).json({ msg: "Please, check your password" });
    }

    res.status(200).json({ msg: `User ${email} loggined successfully` });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};
