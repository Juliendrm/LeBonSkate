const router = require("express").Router();
const isAuth = require("../middleware/middleware");
const Order = require("../models/Order.model");
const Trucks = require("../models/trucks.model");
const Board = require("../models/board.model");
const Wheels = require("../models/wheels.model");
const Skateboard = require("../models/skateboard.model");

router.get("/sell", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user.id }).populate(
      "buyer",
      "-password"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/buy", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/sell/:id", isAuth, async (req, res) => {
  try {
    const approvedOrder = await Order.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.id },
      { approved: true },
      { new: true }
    );
    if (!approvedOrder) {
      console.log(`cannot approve orders of other seller`);
    } else if (approvedOrder.board) {
      soldItem = await Board.findByIdAndUpdate(
        { _id: approvedOrder.board },
        { sold: true },
        { new: true }
      );
      console.log(approvedOrder);
    } else if (approvedOrder.wheels) {
      soldItem = await Wheels.findByIdAndUpdate(
        { _id: approvedOrder.wheels },
        { sold: true },
        { new: true }
      );
      console.log(approvedOrder);
    } else if (approvedOrder.trucks) {
      soldItem = await Trucks.findByIdAndUpdate(
        { _id: approvedOrder.trucks },
        { sold: true },
        { new: true }
      );
      console.log(approvedOrder);
    } else if (approvedOrder.skateBoard) {
      soldItem = await Skateboard.findByIdAndUpdate(
        { _id: approvedOrder.skateBoard },
        { sold: true },
        { new: true }
      ).populate('board').populate('wheels').populate('trucks');
      const soldBoard = await Board.findByIdAndUpdate(
        { _id: approvedOrder.skateBoard.board },
        { sold: true },
        { new: true }
      )
      const soldWheels = await Wheels.findByIdAndUpdate(
        { _id: approvedOrder.skateBoard.wheels },
        { sold: true },
        { new: true }
      )
      const soldTrucks = await Trucks.findByIdAndUpdate(
        { _id: approvedOrder.skateBoard.trucks },
        { sold: true },
        { new: true }
      )
      console.log(soldItem, soldBoard, soldWheels, soldTrucks)
    }
    res.status(200).json(approvedOrder);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
