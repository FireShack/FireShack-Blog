import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { users } from "./routes/users.route";
import { auth } from "./routes/auth.route";
import { initDB } from "./db/db.config";
import { entries } from "./routes/entries.route";
import { search } from "./routes/search.route";

// Basic configs
dotenv.config();
const app = express();
const port =  process.env.PORT || 5000;

// DB connection
initDB();

// Middlewares
app.use(cors());
app.use(json());
app.use("/api", users);
app.use("/api/auth", auth);
app.use("/api/entries", entries);
app.use("/api/search", search);

// Run server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
