import { Router } from "express";
import { body } from "express-validator";
import { createAccount, getUser, login } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

const router = Router();

// Authentication and Register
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("Handle is required"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  handleInputErrors,
  createAccount
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").isLength({ min: 8 }).withMessage("Password is required"),
  handleInputErrors,
  login
);

router.get("/user", authenticate, getUser);

export default router;
