import mongoose from "mongoose";
import { Authors } from "../models/authors.model.js";

class AuthorsController {
  async getAuthors(req, res) {
    try {
      const authors = await Authors.find();
      res.status(200).send({ status: 200, data: authors, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }

  async getAuthorById(req, res) {
    try {
      const { id } = req.params;
      const author = await Authors.findById(id);
      if (!author) {
        return res
          .status(404)
          .json({ status: 404, data: null, error: "Author not found" });
      }
      res.status(200).send({ status: 200, data: author, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }

  async createAuthor(req, res) {
    try {
      const { name, biography } = req.body;

      const author = await Authors.findOne({ name: name });

      if (author) {
        return res
          .status(400)
          .json({ status: 400, data: null, error: "Author already exists!" });
      }

      if (!name || !biography) {
        return res
          .status(400)
          .json({ status: 400, data: null, error: "All fields are required" });
      }
      const newAuthor = new Authors({
        _id: new mongoose.Types.ObjectId(),
        name,
        biography,
      });

      res.status(201).send({ status: 201, data: newAuthor, error: null });

      await newAuthor.save();
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateAuthor(req, res) {
    try {
      const { id } = req.params;
      const { name, biography } = req.body;

      const author = await Authors.findOne({ _id: id });

      if (!author) {
        return res
          .status(404)
          .json({ status: 400, data: null, error: "Author not found" });
      }
      await Authors.updateOne({
        name: name ?? Authors.name,
        biography: biography ?? Authors.biography,
      });

      res.status(201).json({ status: 201, data: author, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteAuthor(req, res) {
    try {
      const { id } = req.params;

      const author = await Authors.findOne({ _id: id });
      if (!author) {
        return res
          .status(404)
          .json({ status: 404, data: null, error: "Author not found" });
      }
      await Authors.deleteOne();

      res.status(201).json({ status: 201, data: author, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new AuthorsController();
