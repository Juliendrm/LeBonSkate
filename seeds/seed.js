require("dotenv/config")
require("../db/index")

const User = require("../models/User.model");
const Trucks = require("../models/trucks.model");
const Board = require("../models/board.model");
const Wheels = require("../models/wheels.model");
const Skateboard = require("../models/skateboard.model");
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
  {
    username: "Camille",
    password: saltedPassword,
    email: "camille@email.com",
    areaCode: 33,
    phoneNumber: 6123456789,
  },
  {
    username: "Felix",
    password: saltedPassword,
    email: "felix@email.com",
    areaCode: 33,
    phoneNumber: 6987654321,
  },
  {
    username: "Charlie",
    password: saltedPassword,
    email: "charlie@email.com",
    areaCode: 33,
    phoneNumber: 6897654321,
  },
];

(async function () {
  await User.deleteMany();
  await Board.deleteMany();
  await Trucks.deleteMany();
  await Wheels.deleteMany();
  await Skateboard.deleteMany();
  const users = await User.create(usersSeed);
  

  console.log(users);
  await mongoose.disconnect();
})()

