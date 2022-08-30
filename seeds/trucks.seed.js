require("dotenv/config")
require("../db/index")

const Trucks = require("../models/trucks.model")
const User = require("../models/User.model")

const trucksSeeds = [
   { brand: "something",
    color: "black",
},
    { brand: "something else",
color: "blue"}
];


(async function () {
    const allUsers = await User.find()
    trucksSeeds.forEach((trucks) => {
        trucks.seller = getRandomId(allUsers)
    })
    const trucksSeedsWithSeller = await Trucks.create(trucksSeeds)
    console.log(trucksSeedsWithSeller)
})()


function getRandomId(array) {
    return array[Math.floor(Math.random()*array.length)]._id
}