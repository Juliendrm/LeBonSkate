const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const salt = 10;

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
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
    };
    const createdUser = await User.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
