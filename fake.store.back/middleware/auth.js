const User = require("../models/UserModel");

const auth = async (req, res, next) => {
  console.log("this is auth");
  const token = getBearerToken(req);
  if (!token) res.status(401).send("unauthorized");
  const user = await User.findByToken(token);
  if (!user) res.status(401).send("unauthorized");
  req["user"] = user;
  next();
};

const getBearerToken = (req) => {
  return req.headers?.authorization?.replace("Bearer ", "");
};

module.exports = auth;
