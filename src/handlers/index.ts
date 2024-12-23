import slug from "slug";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";

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
  const handle = slug(req.body.handle, "");

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

export const login = async (req: Request, res: Response) => {
  // Validar campos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  // Logica de login

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const passwordCorrect = await checkPassword(password, user.password);

  if (!passwordCorrect) {
    res.status(401).json({ message: "Password incorrect" });
    return;
  }

  res.status(200).json({ message: "Login successful" });
  return;
};
