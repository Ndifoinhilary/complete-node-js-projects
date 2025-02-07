import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import _ from "lodash";
import Joi from "joi";

const router = express.Router();


router.post("/login/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user already exists
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send({ msg: "Invalid email or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send({ msg: "Invalid email or password" });

    const token = user.generateToken();

    res.send({token});
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong", error: err.message });
  }
});
function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export default router;
