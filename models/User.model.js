const { Schema, model } = require("mongoose");

const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    trim: true,
    unique: true,
    required: true,
  },
  password: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    required: true,
},
  areaCode: {
    type: Schema.Types.Number,
    required: true,
  },
  phoneNumber: {
    type: Schema.Types.Number,
    required: true,
  }
});

const User = model("User", userSchema);

module.exports = User;
