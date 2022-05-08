import { Router } from "express";
import { handleCreateEntries, handleGetEntries } from "../controllers/entries.controllers";

export const entries = Router();

entries.get("/", handleGetEntries);
entries.post("/add/:id", handleCreateEntries)