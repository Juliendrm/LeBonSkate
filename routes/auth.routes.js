const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jsonWebToken = require('jsonwebtoken')
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

router.post('/login', isAuth, async (req, res, next) => {
  const {username, password} = req.body
  console.log(req.user)
  if(!username || !password) {
    return res.status(400).json({message: 'Please provide username and password'})
  }
  try {
    const foundUser = await User.findOne({username})
    if (!foundUser) {
      return res.status(400).json({message: 'username or password incorrect'})
    }
    const matchingPassword = bcrypt.compareSync(password, foundUser.password)
    // const matchingPassword = await bcrypt.compare(password, foundUser.password)
    if (!matchingPassword) {
      return res.status(400).json({ message: 'username or password incorrect' })
    }

    const payload = {username}
    const token = jsonWebToken.sign(payload,process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '7d'
    } )

    res.status(200).json(token)



  } catch (error) {
    next(error)
  }
})

module.exports = router;
