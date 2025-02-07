import express from "express";
import { Movies, validateMovie } from "../models/movies.js";
import Genre from "../models/genres_db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const genre = await Genre.find().sort("name").populate('movies');
    res.send(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/create/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Invalid genre");

  let movie = new Movies({
    title: req.body.title,
    genre: genre._id,
    release_year: req.body.release_year,
    numberInstock: req.body.numberInstock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});






export default router;
