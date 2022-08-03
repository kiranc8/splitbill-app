const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = Schema(
  {
    userId: String,
    name: String,
    email: String,
    password: String,
  },
  { collection: "User" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
