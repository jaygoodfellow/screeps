
module.exports = {
    run: function(room){
      var towers = room.find(FIND_MY_STRUCTURES, {
          filter: { structureType: STRUCTURE_TOWER }
      })
      _.each(towers, tower => {
        var targets = tower.pos.findInRange(FIND_HOSTILE_CREEPS,15)
        if(targets.length > 0) {
          tower.attack(target[0])
        }
        let targetRepair = tower.pos.findInRange(FIND_STRUCTURES, 25, {
            filter: function (item) {
                if(
                   (item.structureType == STRUCTURE_ROAD && item.hits/item.hitsMax < 0.5) ||
                   (item.structureType == STRUCTURE_CONTAINER && item.hits/item.hitsMax < 0.25) ||
                   (item.structureType == STRUCTURE_RAMPART && item.hits/item.hitsMax < 0.0001)

                ) {
                    return true
                }
                return false
            }
        })

        if(targetRepair.length > 0 && tower.energy/tower.energyCapacity > 0.25){
          tower.repair(targetRepair[0])
        }
      })
    }
}