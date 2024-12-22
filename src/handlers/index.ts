import { Request, Response } from "express";

import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409).json({ message: "User already exists" });
    return;
  }
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: "User created" });
};
