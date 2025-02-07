import express from "express";
import Genre from "../models/genres_db.js";
const router = express.Router();
import auth from "../middlewares/auth.js";

router.get("/", auth, async (req, res) => {
  try {
    const genres = await Genre.find({});
    res.json(genres).status(200);
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
    console.log(err);
  }
});

router.post("/create/", async (req, res) => {
  try {
    let genre = new Genre(req.body);
    genre = await genre.save();
    res.json(genre).status(200);
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
    console.log(err);
  }
});

router.put("/update/:id/", async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) {
    return res.status(404).send({ msg: "Not Found" });
  }
  return res.status(200).send({ msg: "Successfully Updated", genre: genre });
});

router.delete("/remove/:id/", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) {
      return res.status(404).send({ msg: "Not Found" });
    }
    return res.status(200).send({ msg: "Successfully Deleted" });
  } catch (erro) {
    res.status(500).send({ msg: "Server Error", error: error.message });
  }
});

router.get("/:id/", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).send({ msg: "Not Found" }); // Add return here
    }
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).send({ msg: "Server Error", error: error.message });
  }
});

export default router;
