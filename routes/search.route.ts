import { Router } from "express";
import { handleSearch } from "../controllers/search.controller";

const search = Router();

search.get("/:params/:limit", handleSearch);
