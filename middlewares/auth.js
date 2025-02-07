import jwt from "jsonwebtoken";
import "dotenv/config";

// const
function auth(req, res, next) {
  const token = req.header("X-Auth-Token");
  if (!token) return res.status(401).send("Access Denied no token avaialable");
  try {
    const decode = jwt.verify(token, process.env.PRIVATEKEY);
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).send({ msg: "Invalid token", error: error.message });
  }
}

export default auth;
