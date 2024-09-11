import { Router } from "express";
import categoriesController from "../controllers/categories.controller.js";

export const categoriesRouter = Router();

categoriesRouter.get("/categories", categoriesController.getCategories);

categoriesRouter.get("/categories/:id", categoriesController.getCategoryById);

categoriesRouter.post("/categories", categoriesController.createCategory);

categoriesRouter.put("/categories/:id", categoriesController.updateCategory);

categoriesRouter.delete("/categories/:id", categoriesController.deleteCategory);
