const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    trim: true,
    unique: true,
  },
  password: String,
});

const User = model("User", userSchema);

module.exports = User;
