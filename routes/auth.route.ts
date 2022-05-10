import express from "express";
import { check } from "express-validator";
import { handleLogin, handleLogout } from "../controllers/auth.controllers";
import { validateFields } from "../middlewares/validate.fields";

export const auth = express.Router();

auth.post(
  "/login",
  [
    check("email", "You must provide a valid email").not().isEmpty(),
    check("email", "You must provide a valid email").isEmail(),
    check("pass", "You must provide a valid password").not().isEmpty(),
    validateFields,
  ],
  handleLogin
);

auth.post(
  "/logout/:id",
  [check("id", "You must provide a valid id").isMongoId()],
  handleLogout
);
