import createError from "http-errors";
import express from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import genre from "./routes/genre.js";
import customers from "./routes/customer.js";
import movies from "./routes/movies.js";
import users from "./routes/user.js";
import login from "./routes/auth.js";

const app = express();

// View engine setup
app.set("views", join(import.meta.url, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(import.meta.url, "public")));

// Register routes
app.use("/api/v1/genres", genre);
app.use("/api/v1/customers", customers);
app.use("/api/v1/movies", movies);
app.use("/api/v1/users", users);
app.use("/api/v1/users", login);

// Handle 404 errors
app.use((req, res, next) => {
  next(createError(404));
});

// Global error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
