const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const adminRouters = require("./routers/admins");
const shopRouters = require("./routers/shops");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// my middlewares

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.use(adminRouters);
app.use(shopRouters);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./", "views", "404.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
