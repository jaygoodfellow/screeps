'use strict'
const Cache = require('Cache')

function Constructions() {

    this.cache = new Cache()
}
Constructions.prototype.repair = function(room) {
  let towers = room.getStructures('tower')

  for(let tower of towers) {
    let targetRepair = room.findRepair(tower)
    if (targetRepair && tower.energy > 200) tower.repair(Game.getObjectById(targetRepair))
  }
}

module.exports = Constructions