import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model";

export const handleLogin = async (req: Request, res: Response) => {
  const { email, pass } = req.body;
  try {
    const userFound = await userModel.findOne({ email });

    if (!userFound || !userFound.state) {
      return res.status(400).json({ msg: `${email} is not registered` });
    }
    const validPassword = bcrypt.compareSync(pass, userFound.pass);
    if (!validPassword) {
      return res.status(200).json({ msg: "Please, check your password" });
    }

    res.status(200).json({ msg: `User ${email} loggined successfully` });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};
