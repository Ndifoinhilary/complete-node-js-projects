import mongoose from "mongoose";
import Joi from "joi";

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
    min: 1888,
    max: new Date().getFullYear(),
  },
  numberInstock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Movies = mongoose.model("Movies", MovieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.string().required(),
    numberInstock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
    release_year: Joi.number()
      .integer()
      .min(1888)
      .max(new Date().getFullYear())
      .required(),
  });

  return schema.validate(movie);
}

export { Movies, validateMovie };
