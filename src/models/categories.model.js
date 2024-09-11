import mongoose from "mongoose";
import { categoriesSchema } from "../schemas/categories.schema.js";

export const Categories = mongoose.model("category", categoriesSchema);
