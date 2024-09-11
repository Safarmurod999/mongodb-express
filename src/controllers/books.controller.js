import { Books } from "../models/books.model.js";
import Fuse from "fuse.js";
class BooksController {
  async getBooks(req, res) {
    try {
      const { q } = req.query;
      const books = await Books.find();
      if (q) {
        const fuseOptions = {
          keys: ["title", "author.name", "category.name"],
          includeScore: true,
          threshold: 0.4,
        };
        const fuse = new Fuse(books, fuseOptions);
        const results = fuse.search(q);
        return res
          .status(200)
          .send({ status: 200, data: results, error: null });
      }
      res.status(200).send({ status: 200, data: books, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }

  async getBookById(req, res) {
    try {
      const { id } = req.params;
      const books = await Books.findOne({ _id: id });
      res.status(200).send({ status: 200, data: books, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }

  async createBook(req, res) {
    try {
      const { title, author, category, publishedYear, summary } = req.body;

      const book = await Books.findOne({ title: title });

      if (book) {
        return res
          .status(400)
          .json({ status: 400, data: null, error: "Book already exists!" });
      }
      if (!title || !author || !category || !publishedYear || !summary) {
        return res
          .status(400)
          .json({ status: 400, data: null, error: "All fields are required" });
      }
      const newBook = new Books({
        title,
        author,
        category,
        publishedYear,
        summary,
      });

      res.status(201).send({ status: 201, data: newBook, error: null });

      await newBook.save();
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const { title, author, category, publishedYear, summary } = req.body;

      const book = await Books.findOne({ _id: id });

      if (!book) {
        return res
          .status(404)
          .json({ status: 400, data: null, error: "Book not found" });
      }
      await Books.updateOne({
        title: title ?? book.title,
        author: author ?? book.author,
        category: category ?? book.category,
        publishedYear: publishedYear ?? book.publishedYear,
        summary: summary ?? book.summary,
      });

      res.status(200).json({ status: 201, data: book, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteBook(req, res) {
    try {
      const { id } = req.params;

      const book = await Books.findOne({ _id: id });
      if (!book) {
        return res
          .status(404)
          .json({ status: 404, data: null, error: "Book not found" });
      }
      await Books.deleteOne();

      res.status(200).json({ status: 200, data: book, error: null });
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new BooksController();
