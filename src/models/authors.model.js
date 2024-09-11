import mongoose from "mongoose";
import { authorsSchema } from "../schemas/authors.schema.js";

export const Authors = mongoose.model("author", authorsSchema);

