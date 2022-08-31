const router = require("express").Router();
const Trucks = require("../models/trucks.model");
const Order = require("../models/Order.model");
const isAuth = require("../middleware/middleware");
const User = require("../models/User.model");

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

// post trucks order
router.post("/:id", isAuth, async (req, res, next) => {
  const trucks = await Trucks.findById(req.params.id);
  const seller = await User.findById(trucks.seller);
  try {
    const newOrder = await Trucks.create({
      buyer: req.user.id,
      seller: seller.id,
    });
    const populatedOrder = await Order.findById(newOrder.id).populate(
      "buyer",
      "-password"
    );
    res.status(201).json(populatedOrder);
  } catch {
    res.status(400);
  }
});

module.exports = router;
