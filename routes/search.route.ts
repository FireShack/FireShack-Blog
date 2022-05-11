import { Router } from "express";
import {
  handleSearchEntries,
  handleSearchUsers,
} from "../controllers/search.controller";

export const search = Router();

search.get("/entries/:params", handleSearchEntries);
search.get("/users/:params", handleSearchUsers);
