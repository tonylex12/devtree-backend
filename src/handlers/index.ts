import slug from "slug";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("User's email already exists");
    res.status(409).json({ error: error.message });
    return;
  }
  const handle = slug(req.body.handle, "");

  const handleExists = await User.findOne({ handle });
  if (handleExists) {
    const error = new Error("Username not available");
    res.status(409).json({ error: error.message });
    return;
  }

  const user = new User(req.body);
  user.password = await hashPassword(user.password);
  user.handle = handle;
  await user.save();
  res.status(201).json({ message: "User created" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found");
    res.status(404).json({ error: error.message });
    return;
  }

  const passwordCorrect = await checkPassword(password, user.password);

  if (!passwordCorrect) {
    const error = new Error("Password incorrect");
    res.status(401).json({ error: error.message });
    return;
  }

  res.status(200).json({ message: "Login successful" });
  return;
};
