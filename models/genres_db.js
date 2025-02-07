import { Schema, model } from "mongoose";

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 5,
  },
  movies: [{ type: Schema.Types.ObjectId, ref: "Movies" }],
});

const Genre = model("Genre", GenreSchema);

export default Genre;
