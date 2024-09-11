import { Router } from "express";
import authorsController from "../controllers/authors.controller.js";

export const authorsRouter = Router();

authorsRouter.get("/authors", authorsController.getAuthors);

authorsRouter.get("/authors/:id", authorsController.getAuthorById);

authorsRouter.post("/authors", authorsController.createAuthor);

authorsRouter.put("/authors/:id", authorsController.updateAuthor);

authorsRouter.delete("/authors/:id", authorsController.deleteAuthor);
