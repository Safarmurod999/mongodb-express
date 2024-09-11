import { Router } from "express";
import booksController from "../controllers/books.controller.js";

export const booksRouter = Router();

booksRouter.get("/books", booksController.getBooks);

booksRouter.get("/books/:id", booksController.getBookById);

booksRouter.post("/books", booksController.createBook);

booksRouter.put("/books/:id", booksController.updateBook);

booksRouter.delete("/books/:id", booksController.deleteBook);
