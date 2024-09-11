import { Schema } from "mongoose";

export const authorsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, trim: true, unique: true },
  biography: { type: String, required: true, trim: true, unique: false },
});
