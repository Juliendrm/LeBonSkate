
require("./../db")

const User = require("../models/User.model");
// const Trucks = require("../models/trucks.model");
// const Board = require("../models/board.model");
// const Wheels = require("../models/wheels.model");
// const Skateboard = require("../models/skateboard.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = 10;
let password = "password";
const generatedSalt = bcrypt.genSaltSync(salt);
const saltedPassword = bcrypt.hashSync(password, generatedSalt);

const usersSeed = [
  {
    username: "Julien",
    password: saltedPassword,
    email: "julien@email.com",
    areaCode: 33,
    phoneNumber: 7123456789,
  },
  {
    username: "Hamza",
    password: saltedPassword,
    email: "hamza@email.com",
    areaCode: 33,
    phoneNumber: 7987654321,
  },
];

(async function () {
  console.log('here')
  await User.deleteMany();

  const users = await User.create(usersSeed);

  console.log(users);
  await mongoose.disconnect();
})()

