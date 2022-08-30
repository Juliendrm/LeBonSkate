require("dotenv/config")
require("../db/index")

const Wheels = require("../models/wheels.model")
const User = require("../models/User.model")
const {getRandomId} = require("../middleware/middleware")

const wheelsSeed = [
    {brand: "Spitfire",
    color: "Red",
    abec: 3},
    { brand: "Bones",
    color: "Black",
    abec: 11},
    { brand: "OJ",
    color: "Yellow",
    abec: 9},
    { brand: "Powell Peralta",
    color: "White",
    abec: 7},
    { brand: "Ricta",
    color: "Black",
    abec: 5},
    { brand: "Welcome Orbs",
    color: "Green",
    abec: 5},
    { brand: "Mini Logo",
    color: "Purple",
    abec: 9},
    { brand: "Santa Cruz",
    color: "White",
    abec: 7},
    { brand: "DGK",
    color: "Red",
    abec: 5},
    { brand: "No Logo",
    color: "Transparent",
    abec: 7}
];


(async function () {
    const allUsers = await User.find()
    wheelsSeed.forEach((wheels) => {
        wheels.seller = getRandomId(allUsers)
    })
    const wheelsWithSeller = await Wheels.create(wheelsSeed)
    console.log(wheelsWithSeller)
})()