const router = require("express").Router();
const isAuth = require("../middleware/middleware");
const Order = require("../models/Order.model");
const Wheels = require("../models/wheels.model");

// POST
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
    //console.log(newWheels);
    res.status(201).json(newWheels);
  } catch {
    res.status(400);
  }
});

//post wheels order
router.post("/:id", isAuth, async (req, res, next) => {
  const wheels = await Wheels.findById(req.params.id);
  const seller = await User.findById(wheels.seller);
  try {
    const newOrder = await Wheels.create({
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

//GET
router.get("/", async (req, res, next) => {
  //console.log(`test`);
  try {
    const wheelsFound = await Wheels.find();
    res.status(201).json(wheelsFound);
  } catch {
    res.status(400);
  }
});

//DELETE
router.delete("/:id", isAuth, async (req, res, next) => {
  try {
    const deleteWheels = await Wheels.findOneAndRemove({
      _id: req.params.id,
      seller: req.user.id,
    });
    res.status(200).json(deleteWheels);
  } catch {
    res.status(400);
  }
});

module.exports = router;
