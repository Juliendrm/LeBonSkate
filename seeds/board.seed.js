require("dotenv/config")
require("../db/index")

const Board = require("../models/board.model")
const User = require("../models/User.model")
const getRandomId = require("../utils/utils")

const boardSeeds = [
{ brand: "Santa Cruz",
color: "White",
size: 7,
},
{ brand: "Powell Peralta",
color: "Red",
size: 8.25,
},
{ brand: "Girl",
color: "Yellow",
size: 8.25,
},
{ brand: "Anti-Hero",
color: "Green",
size: 8.75,
},
{ brand: "Enjoi",
color: "Black",
size: 8,
},
{ brand: "Baker",
color: "Grey",
size: 7.5,
},
{ brand: "Real",
color: "White",
size: 8.25,
},
{ brand: "Polar",
color: "Purple",
size: 8.25,
},
{ brand: "Element",
color: "Orange",
size: 8.25,
},
{ brand: "Birdhouse",
color: "Beige",
size: 8.5,
},
];


(async function () {
    const allUsers = await User.find()
    boardSeeds.forEach((board) => {
        board.seller = getRandomId(allUsers)
    })
    const boardsWithSeller = await Board.create(boardSeeds)
    console.log(boardsWithSeller)
    process.exit()
})()


