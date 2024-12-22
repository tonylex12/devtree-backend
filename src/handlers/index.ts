import bcrypt from "bcrypt";

import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409).json({ message: "User already exists" });
    return;
  }
  const user = new User(req.body);
  user.password = await hashPassword(user.password);
  await user.save();
  res.status(201).json({ message: "User created" });
};
