import mongoose from "mongoose";
import { booksSchema } from "../schemas/books.schema.js";

export const Books = mongoose.model("books", booksSchema);

