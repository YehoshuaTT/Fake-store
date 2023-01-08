const jwt = require("jsonwebtoken");
require("dotenv");
const secret = process.env.SECRET;
const creatToken = async (data) => {
  return jwt.sign({ email: data }, secret, { expiresIn: "1h" });
};

const validToken = async (req, res, next) => {
  console.log("im in", req.headers);
  try {
    let data = req.headers.autherization.replace("Bearer ", "");
    console.log("data:    ", data);
    const result = jwt.verify(data, secret);
    console.log("result:    ", result);
    // next();
    return result.email;
  } catch (err) {
    console.log("err", err);
    res.status(401).send("you are unauthorized to enter");
  }
};

module.exports = { creatToken, validToken };
