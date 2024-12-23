import { Router } from "express";
import { body } from "express-validator";
import { createAccount } from "./handlers";

const router = Router();

// Authentication and Register
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("Handle is required"),
  body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  createAccount
);

export default router;
