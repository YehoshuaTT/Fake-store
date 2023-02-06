const jwt = require("jsonwebtoken");
const { errMessage } = require("./errController");
require("dotenv");
const secret = process.env.SECRET;
const creatToken = async (data) => {
  return jwt.sign({ email: data }, secret, { expiresIn: "1h" });
};

const validToken = async (req, res, next) => {
  let data = req.headers.authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(data, secret);

    res.status(201);
    next();
  } catch (error) {
    console.log(errMessage.UNAUTHORIZED);
  }
};

module.exports = { creatToken, validToken };
