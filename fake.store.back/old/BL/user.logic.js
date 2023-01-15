const userController = require("../DL/users/user.controller");
const bcrypt = require("bcrypt");
const auth = require("../auth");

const register = async (userDetails) => {
  const doesExict = await userController.findOne({
    email: userDetails.email,
  });
  if (doesExict) return null;
  const userPass = userDetails.password;
  const hash = bcrypt.hashSync(userPass, 10);
  userDetails.password = hash;

  return await userController.creat(userDetails);
};

const login = async (loginUserDetails) => {
  const doesExict = await userController.findOne({
    email: loginUserDetails.email,
  });
  console.log("doesExict", doesExict);
  if (!doesExict) return null;
  else {
    const validation = await bcrypt.compare(
      loginUserDetails.password,
      doesExict.password
    );
    console.log("validation", validation);

    if (validation)
      return { token: await auth.creatToken(loginUserDetails.email) };
    else return null;
  }
};

module.exports = { register, login };
