const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const salt = 10;

router.post("/signup", async (req, res, next) => {
  //console.log(`1`);
  const { username, password, email, areaCode, phoneNumber} = req.body;
  if (!password || !username) {
    return res.status(400).json({ message: "username and password requires" });
  }
  try {
    const usernameTaken = await User.findOne({ username });
    if (usernameTaken) {
      return res.status(400).json({ message: "this username is taken" });
    }
    const generatedSalt = bcrypt.genSaltSync(salt);
    const saltedPassword = bcrypt.hashSync(password, generatedSalt);

    const newUser = {
      username,
      password: saltedPassword,
      areaCode: areaCode,
      email: email,
      phoneNumber: phoneNumber,
    };
    const createdUser = await User.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});

router.get("/signup", async (req, res, next) => {});

module.exports = router;
