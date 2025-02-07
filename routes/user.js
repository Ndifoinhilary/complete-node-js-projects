import express from "express";
import bcrypt from "bcrypt";
import { User, validate } from "../models/user.js";
import _ from "lodash";
import passwordComplexity from "joi-password-complexity";
import auth from "../middlewares/auth.js";


const router = express.Router();
router.get('/me/', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
})
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ msg: "User already exists" });

    // Validate password complexity
    const passwordValidation = passwordComplexity().validate(req.body.password);
    if (passwordValidation.error)
      return res.status(400).send(passwordValidation.error.details[0].message);

    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    const token = user.generateToken();
    res
      .header({ "X-Auth-Token": token })
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong", error: err.message });
  }
});

export default router;
