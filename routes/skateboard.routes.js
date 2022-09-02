const router = require("express").Router();
const Trucks = require("../models/trucks.model");
const Board = require("../models/board.model");
const Wheels = require("../models/wheels.model");
const Skateboard = require("../models/skateboard.model");
const Order = require("../models/Order.model");
const isAuth = require("../middleware/middleware");
const User = require("../models/User.model");

router.post("/", isAuth, async (req, res, next) => {
  try {
    const { board, trucks, wheels } = req.body;
    // const boardToBuild = await Board.findById(board);
    // const trucksToBuild = await Trucks.findById(trucks);
    // const wheelsToBuild = await Wheels.findById(wheels);

    const newSkateboard = await Skateboard.create({
      board: board,
      trucks: trucks,
      wheels: wheels,
      seller: req.user.id,
    });

    res.status(201).json(await newSkateboard.populate("trucks board wheels"));
  } catch (err){
    res.status(400).send(err.message);
  }
});

//create order for skateboard
router.post("/:id", isAuth, async (req, res, next) => {
  const skateboard = await Skateboard.findById(req.params.id);
  const seller = await User.findById(skateboard.seller);
  //console.log(board);
  //console.log(seller);
  //console.log(seller.id);
  try {
    const newOrder = await Order.create({
      buyer: req.user.id,
      seller: seller.id,
      skateBoard: skateboard.id,
    });
    const populatedOrder = await Order.findById(newOrder.id).populate(
      "buyer",
      "-password"
    ).populate(
      "seller",
      "username",
    );
    res.status(201).json(populatedOrder);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const skateboardFound = await Skateboard.find({ sold: false });
    res.status(201).json(skateboardFound);
  } catch (err){
    res.status(400).send(err.message);
  }
});

router.get("/selling", isAuth, async (req, res, next) => {
  try {
    const skateboardFound = await Skateboard.find({ sold: false, seller: req.user._id });
    res.status(201).json(skateboardFound);
  } catch (error){
    res.status(400).send(error.message);
  }
})

router.delete("/:id", isAuth, async (req, res, next) => {
  try {
    const deleteSkateboard = await Skateboard.findOneAndRemove({
      _id: req.params.id,
      seller: req.user.id,
    });
    res.status(200).json(deleteSkateboard);
  } catch (error){
    res.status(400).send(error.message);
  }
});

module.exports = router;
