import { Router } from "express";
import {
  handleCreateEntries,
  handleDeleteEntries,
  handleGetUserEntries,
  handleUpdateEntries,
} from "../controllers/entries.controllers";

export const entries = Router();

entries.get("/:id", handleGetUserEntries);
entries.post("/add/:id", handleCreateEntries);
entries.put("/modify/:id/:entryID", handleUpdateEntries);
entries.delete("/delete/:id/:entryID", handleDeleteEntries);
