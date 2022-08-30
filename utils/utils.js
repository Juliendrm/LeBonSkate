const getRandomId = function (array) {
    return array[Math.floor(Math.random()*array.length)]._id
  }

module.exports = getRandomId;