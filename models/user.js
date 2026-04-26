const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  // passport-local-mongoose automatically adds username,
  // hash and salt in our schema with some methods
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose.default);

module.exports = mongoose.model("User", userSchema);
