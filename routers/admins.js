const express = require("express");
const path = require("path");
const rootDir = require("../utils/paths");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-products.html"));
});

router.post("/product", (req, res) => {
  console.log(req.body); // Logs the parsed body
  res.redirect("/");
});

module.exports = router;
