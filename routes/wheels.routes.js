const router = require("express").Router();
const isAuth = require("../middleware/middleware");
const Order = require("../models/Order.model");
const Wheels = require("../models/wheels.model");
const User = require("../models/User.model");

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
    const newOrder = await Order.create({
      buyer: req.user.id,
      seller: seller.id,
      wheels: wheels.id,
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
    const wheelsFound = await Wheels.aggregate([
      {
        $match: { sold: false },
      },
      {
        $lookup: {
          from: "skateboards",
          localField: "_id",
          foreignField: "wheels",
          as: "result",
        },
      },
      {
        $match: {
          "result.0": {
            $exists: false,
          },
        },
      },
      {
        $unset: "result",
      },
    ]);
    res.status(200).json(wheelsFound);
  } catch {
    res.status(400);
  }
});

router.get("/selling", async (req, res, next) => {
  //console.log(`test`);
  try {
    const wheelsFound = await Wheels.aggregate([
      {
        $match: { sold: false,
        seller: req.user._id },
      },
      {
        $lookup: {
          from: "skateboards",
          localField: "_id",
          foreignField: "wheels",
          as: "result",
        },
      },
      {
        $match: {
          "result.0": {
            $exists: false,
          },
        },
      },
      {
        $unset: "result",
      },
    ]);
    res.status(200).json(wheelsFound);
  } catch {
    res.status(400);
  }
});

//DELETE
router.delete("/:id", isAuth, async (req, res, next) => {
  try {
    const wheelsPartOfSkateboard = await Skateboard.find({
      board: req.params.id,
    });

    console.log(wheelsPartOfSkateboard);
    console.log(`test`);
    if (wheelsPartOfSkateBoard.length !== 0) {
      return res
        .status(406)
        .json({ message: `cannot delete componant of complete skateboard` });
    }

    console.log(req.params.id, req.user.id);
    const deleteWheels = await Board.findOneAndRemove({
      _id: req.params.id,
      seller: req.user.id,
    });
    if (!deleteWheels) {
      res.sendStatus(404);
    }
    res.status(204).json;
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
