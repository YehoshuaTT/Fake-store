const mongoose = require("mongoose");
const MONGO_URL =
  "mongodb+srv://Admin:Admin@joshcluster.bh9uxfg.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
  try {
    mongoose.connect(
      MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true},
      (err) => {
        if (err) throw "Eror DB : " + err;
        console.log("Connection Succsess");
      }
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { connect };
