const router = require("express").Router();
const isAuth = require("../middleware/middleware");
const Order = require("../models/Order.model");
const Wheels = require("../models/wheels.model");
const Skateboard = require("../models/skateboard.model")
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
  } catch (error) {
    res.status(400).send(error.message);
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
  } catch (error) {
    res.status(400).send(error.message);
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
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/selling", isAuth, async (req, res, next) => {
  //console.log(`test`);
  try {
    console.log(`test`)
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
    console.log(`test2`)
    res.status(200).json(wheelsFound);
  } catch(error) {
    res.status(400).send(error.message);
  }
});

//DELETE
router.delete("/:id", isAuth, async (req, res, next) => {
  try {
    const wheelsPartOfSkateboard = await Skateboard.find({
      board: req.params.id,
    });
    if (wheelsPartOfSkateboard.length !== 0) {
      return res
        .status(406)
        .json({ message: `cannot delete componant of complete skateboard` });
    }

    const deleteWheels = await Wheels.findOneAndRemove({
      id: req.params.id,
      seller: req.user._id,
    })
    res.status(204).json(deleteWheels);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
