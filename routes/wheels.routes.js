const router = require("express").Router();
const isAuth = require("../middleware/middleware");
const Wheels = require("../models/wheels.model");

router.post("/", isAuth, async (req, res, next) => {
  try {
    const { brand, color, abec, size } = req.body;
    const newWheels = await Wheels.create({
      brand: brand,
      color: color,
      abec: abec,
      size: size,
      seller: req.user.id,
    });
    console.log(newWheels);
    res.status(201).json(newWheels);
  } catch {
    res.status(400);
  }
});

router.get("/", async (req, res, next) => {
  console.log(`test`);
  try {
    const wheelsFound = await Wheels.find();
    res.status(201).json(wheelsFound);
  } catch {
    res.status(400);
  }
});

module.exports = router;
