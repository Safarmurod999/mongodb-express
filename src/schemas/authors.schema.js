import { Schema } from "mongoose";
import { Books } from "../models/books.model.js";

export const authorsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, trim: true, unique: true },
  biography: { type: String, required: true, trim: true, unique: false },
});