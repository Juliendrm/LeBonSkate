const router = require("express").Router();
const Trucks = require("../models/trucks.model");

router.post("/", async (req, res, next) => {
  try {
    const { brand, color } = req.body;
    const newTrucks = await Trucks.create({
      brand: brand,
      color: color,
    });
    console.log(newTrucks);
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
