import slug from "slug";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  // Validar campos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409).json({ message: "User's email already exists" });
    return;
  }
  const handle = slug(req.body.handle, '');

  const handleExists = await User.findOne({ handle });
  if (handleExists) {
    res.status(409).json({ message: "Username not available" });
    return;
  }

  const user = new User(req.body);
  user.password = await hashPassword(user.password);
  user.handle = handle;
  await user.save();
  res.status(201).json({ message: "User created" });
};
