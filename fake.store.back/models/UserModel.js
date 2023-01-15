const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const authService = require("../services/authService");

const userSchema = require("./schemas/userSchema");

class UserClass {
  static async register(userDetails) {
    if (await this.countDocuments({ email: userDetails.email })) {
      return null;
    }
    const userPass = userDetails.password;
    const hash = bcrypt.hashSync(userPass, 10);
    userDetails.password = hash;

    return await this.create(userDetails);
  }

  static async login({ email, password }) {
    const user = await this.findOne({ email });
    if (!user) return null;

    const validation = await bcrypt.compare(password, user.password);
    if (validation) return { token: await authService.createToken(email) };
    else return null;
  }

  static async findByToken(token) {
    const tokenData = await authService.findByToken(token);
    const user = await this.findOne({ email: tokenData.email });
    return user;
  }
}

userSchema.loadClass(UserClass);
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
