import { Router } from "express";
import { check } from "express-validator";
import {
  handleCreateEntries,
  handleDeleteEntries,
  handleGetUserEntries,
  handleUpdateEntries,
} from "../controllers/entries.controllers";
import { existsUser } from "../middlewares/db.validator";
import { validateFields } from "../middlewares/validate.fields";

export const entries = Router();

entries.get(
  "/:id",
  [
    check("id", "You must provide a valid ID").isMongoId(),
    check("id").custom(existsUser),
    validateFields,
  ],
  handleGetUserEntries
);
entries.post(
  "/add/:id",
  [
    check("id", "You must provide a valid ID").isMongoId(),
    check("id").custom(existsUser),
    validateFields,
  ],
  handleCreateEntries
);
entries.put(
  "/modify/:id/:entryID",
  [
    check("id", "You must provide a valid ID").isMongoId(),
    check("id").custom(existsUser),
    check("entryID", "You must provide a valid entry ID").isLength({ min: 36 }),
    validateFields,
  ],
  handleUpdateEntries
);
entries.delete(
  "/delete/:id/:entryID",
  [
    check("id", "You must provide a valid ID").isMongoId(),
    check("id").custom(existsUser),
    check("entryID", "You must provide a valid entry ID").isLength({ min: 36 }),
    validateFields,
  ],
  handleDeleteEntries
);
