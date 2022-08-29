const router = require("express").Router();
const Trucks = require("../models/trucks.model");
const isAuth = require("../middleware/middleware");

router.post("/", isAuth, async (req, res, next) => {
  try {
    const { brand, color } = req.body;
    const newTrucks = await Trucks.create({
      brand: brand,
      color: color,
      seller: req.user.id,
    });
    //console.log(newTrucks);
    res.status(201).json(newTrucks);
  } catch {
    res.status(400);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const trucksFound = await Trucks.find();
    res.status(201).json(trucksFound);
  } catch {
    res.status(400);
  }
});

module.exports = router;
