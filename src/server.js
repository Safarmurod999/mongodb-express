import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { authorsRouter } from "./router/authors.routes.js";
import { booksRouter } from "./router/books.routes.js";
import { categoriesRouter } from "./router/categories.routes.js";

!(async function () {
  try {
    const app = express();
    await mongoose
      .connect(process.env.DB_CONNECTION_STRING)
      .then(() => console.log("Database connected!"));

    app.use(express.json());

    app.use(authorsRouter);
    app.use(categoriesRouter);
    app.use(booksRouter);

    app.listen(
      process.env.PORT,
      console.log("server is running at port", 4000)
    );
  } catch (error) {
    console.log(error.message);
  }
})();
