import { Request, Response } from "express";
import JWT from "jsonwebtoken";

export const validateJWT = async (
  req: Request,
  res: Response,
  next: Function
) => {
  //   Take the token
  const token = req.header("token");
  //   Token non provided
  if (!token) {
    return res.status(400).json({ msg: "You must provide a token" });
  }
  // Try to validate the token
  try {
    JWT.verify(token, process.env.PRIVATE_KEY as string);
    next();
  } catch (error) {
    res.status(400).json({ msg: "Your token is not valid" });
  }
};
