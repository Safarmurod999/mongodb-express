import { Schema } from "mongoose";

export const categoriesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, trim: true, unique: true },
  description: { type: String, required: true, trim: true, unique: false },
});
