import { Request, Response } from "express";

export const handleSearch = (req: Request, res: Response) => {
  const { params, limit } = req.params;
  try {
    res.status(200).json({ msg: "Your search results" });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong", error });
  }
};
