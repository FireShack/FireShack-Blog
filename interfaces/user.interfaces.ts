import { userEntries } from "./entry.interfaces";

export interface userModel {
  img: string;
  name: string;
  email: string;
  pass: string;
  description: string;
  role: string;
  state: boolean;
  google: boolean;
  entries: userEntries[];
}
