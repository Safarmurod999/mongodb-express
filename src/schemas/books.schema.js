import { Schema } from "mongoose";
import { Categories } from "../models/categories.model.js";
import { Authors } from "../models/authors.model.js";

export const booksSchema = new Schema({
  title: { type: String, required: true, trim: true, unique: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: "Authors" },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Categories" },
  publishedYear: { type: Number, required: true, default: 20 },
  summary: { type: String, required: true, trim: true, unique: false },
});
