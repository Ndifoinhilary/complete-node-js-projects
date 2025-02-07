import Joi from "joi";
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 5,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 5,
  },
});

UserSchema.methods.generateToken = function () {
  const privateKey = process.env.PRIVATEKEY || "privatekey";
  const jwtToken = jwt.sign({ _id: this._id }, privateKey);
  return jwtToken;
};

const User = model("User", UserSchema);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export { User, validate };
