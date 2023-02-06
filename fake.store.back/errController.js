const err = (c, m) => {
  return { code: c, message: m };
};

const errMessage = Object.freeze({
  MISSING_DATA: err(400, "Missing data"),
  USER_NOT_FOUND: err(400, "User not found"),
  USER_ALREADY_REGISTERED: err(400, "User already registered"),
  WORNG_PASSWORD: err(400, "Incorrect password or Email "),
  USER_NOT_REGISTERED: err(400, "User not registered"),
  SUCCESS: err(200, "Success"),
  UNAUTHORIZED: err(401, "You are Unautohrized"),
  INTERNAL_ERROR: err(500, "Internal server error"),
});

const sendError = (res, err) => {
  console.log(err);
  res.status(err.code || 500).send(err.message || "try agien later");
};
module.exports = {
  errMessage,
  sendError,
};
