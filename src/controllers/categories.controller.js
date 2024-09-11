import mongoose from "mongoose";
import { Categories } from "../models/categories.model.js";

class CategoriesController {
  async getCategories(req, res) {
    try {
      const authors = await Categories.find();
      res.status(200).send({ status: 200, data: authors, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await Categories.findById(id);
      if (!category) {
        return res
          .status(404)
          .json({ status: 404, data: null, error: "Category not found" });
      }
      res.status(200).send({ status: 200, data: category, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }

  async createCategory(req, res) {
    try {
      const { name, description } = req.body;

      const category = await Categories.findOne({ name: name });

      if (category) {
        return res
          .status(400)
          .json({ status: 400, data: null, error: "Category already exists!" });
      }

      if (!name || !description) {
        return res
          .status(400)
          .json({ status: 400, data: null, error: "All fields are required" });
      }

      const newCategory = new Categories({
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
      });

      res.status(201).send({ status: 201, data: newCategory, error: null });

      await newCategory.save();
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const category = await Categories.findOne({ _id: id });

      if (!category) {
        return res
          .status(404)
          .json({ status: 400, data: null, error: "Category not found" });
      }
      await Categories.updateOne({
        name: name ?? category.name,
        description: description ?? category.description,
      });

      res.status(201).json({ status: 201, data: category, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await Categories.findOne({ _id: id });
      if (!category) {
        return res
          .status(404)
          .json({ status: 404, data: null, error: "Category not found" });
      }
      await Categories.deleteOne();

      res.status(201).json({ status: 201, data: category, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new CategoriesController();
