const router = require("express").Router();
const Board = require("../models/board.model");
const isAuth = require("../middleware/middleware");
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const Skateboard = require("../models/skateboard.model");

// seller sell wheels with that.
router.post("/", isAuth, async (req, res, next) => {
  //console.log("test");
  //console.log(req.user._id);
  //console.log("test");
  try {
    const { brand, color, size } = req.body;
    const newBoard = await Board.create({
      brand: brand,
      color: color,
      size: size,
      seller: req.user.id,
    });
    //console.log(newBoard);
    res.status(201).json(newBoard);
  } catch {
    res.status(400);
  }
});

// allow the buyer to find the wheels he wants.
router.get("/", async (req, res, next) => {
  //console.log(`test`);
  // below cross references board ID in Skateboard collection
  // and only shows boards not in skateboard collection
  try {
    const boardsFound = await Board.aggregate([
      {
        $match: { sold: false },
      },
      {
        $lookup: {
          from: "skateboards",
          localField: "_id",
          foreignField: "board",
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
    console.log(boardsFound);
    res.status(201).json(boardsFound);
  } catch {
    res.status(400);
  }
});

// Make an order for board
router.post("/:id", isAuth, async (req, res, next) => {
  const board = await Board.findById(req.params.id);
  const seller = await User.findById(board.seller);
  //console.log(board);
  //console.log(seller);
  //console.log(seller.id);
  try {
    const newOrder = await Order.create({
      buyer: req.user.id,
      seller: seller.id,
      board: board.id,
    });
    console.log(board);
    const populatedOrder = await Order.findById(newOrder.id).populate(
      "buyer",
      "-password"
    );
    res.status(201).json(populatedOrder);
  } catch {
    res.status(400);
  }
});

router.delete("/:id", isAuth, async (req, res, next) => {
  try {
    const boardsPartOfSkateBoard = await Skateboard.find({
      board: req.params.id,
    });

    console.log(boardsPartOfSkateBoard);
    console.log(`test`);
    if (boardsPartOfSkateBoard.length !== 0) {
      return res
        .status(406)
        .json({ message: `cannot delete componant of complete skateboard` });
    }

    console.log(req.params.id, req.user.id);
    const deleteBoard = await Board.findOneAndRemove({
      _id: req.params.id,
      seller: req.user.id,
    });
    if (!deleteBoard) {
      res.sendStatus(404);
    }
    res.status(204).json;
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
