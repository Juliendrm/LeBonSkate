const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    trim: true,
    unique: true,
  },
  password: String,
  email: {
    type: Schema.Types.String,
    // trim removes spaces if they were included in the request
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    // validate makes sure that the email address is in the correct format
    validate: [validateEmail, "Please provide a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  phoneNumber: Schema.Types.Number,
  timestamps: true,
});

const User = model("User", userSchema);

module.exports = User;
