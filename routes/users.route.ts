import express from "express";
import { check } from "express-validator";
import {
  handleDeleteUsers,
  handleGetUser,
  handleGetUsers,
  handlePostUsers,
  handlePutUsers,
} from "../controllers/users.controllers";
import { existsEmail, existsUser } from "../middlewares/db.validator";
import { validateFields } from "../middlewares/validate.fields";
import { validateJWT } from "../middlewares/validate.jwt";

export const users = express.Router();

users.get("/users", handleGetUsers);
users.get(
  "/users/:id",
  [
    validateJWT,
    check("id", "You must provide the ID").isEmpty(),
    check("id", "You must provide a valid ID").isMongoId(),
    validateFields,
  ],
  handleGetUser
);
users.post(
  "/users/add",
  [
    check("name", "You must provide a name").not().isEmpty(),
    check("email", "You must provide a valid email").isEmail(),
    check("email").custom(existsEmail),
    check("pass", "You must provide a valid password").not().isEmpty(),
    check("pass", "You must provide a longer password").isLength({
      min: 8,
    }),
    validateFields,
  ],
  handlePostUsers
);
users.put(
  "/users/modify/:id",
  [
    validateJWT,
    check("id").not().isEmpty(),
    check("id", "You must provide a valid ID").isMongoId(),
    check("id").custom(existsUser),
    check("name", "You must provide a valid name").not().isEmpty(),
    check("email", "You must provide a valid email").isEmail(),
    validateFields,
  ],
  handlePutUsers
);
users.delete(
  "/users/delete/:id",
  [
    validateJWT,
    check("id").not().isEmpty(),
    check("id", "You must provide a valid ID").isMongoId(),
    check("id").custom(existsUser),
    validateFields,
  ],
  handleDeleteUsers
);
