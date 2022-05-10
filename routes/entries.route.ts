import { Router } from "express";
import { check } from "express-validator";
import {
  handleCreateEntries,
  handleDeleteEntries,
  handleGetAllEntries,
  handleGetOneEntry,
  handleGetUserEntries,
  handleUpdateEntries,
} from "../controllers/entries.controllers";
import { existsEntry, existsUser } from "../middlewares/db.validator";
import { validateFields } from "../middlewares/validate.fields";
import { validateJWT } from "../middlewares/validate.jwt";

export const entries = Router();
entries.get("/all", handleGetAllEntries);

// User Entries
entries.get("/entry/:entryID", handleGetOneEntry);
entries.get(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide a valid ID").isMongoId(),
    check("id").custom(existsUser),
    validateFields,
  ],
  handleGetUserEntries
);
entries.post(
  "/add/:id",
  [
    validateJWT,
    check("id", "You must provide a valid ID").isMongoId(),
    check("id").custom(existsUser),
    validateFields,
  ],
  handleCreateEntries
);
entries.put(
  "/modify/:entryID",
  [
    validateJWT,
    check("entryID", "You must provide a valid ID").custom(existsEntry),
    check("entryID", "You must provide a valid entry ID").isLength({ min: 36 }),
    validateFields,
  ],
  handleUpdateEntries
);
entries.delete(
  "/delete/:entryID",
  [
    validateJWT,
    check("entryID", "You must provide a valid ID").custom(existsEntry),
    check("entryID", "You must provide a valid entry ID").isLength({ min: 36 }),
    validateFields,
  ],
  handleDeleteEntries
);
