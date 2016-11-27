
module.exports = {
    run: function(){
      for(let id in Game.structures){
        let structure = Game.structures[id]
        if (structure.structureType == STRUCTURE_TOWER) {
          let target = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
          if(target) {
            structure.attack(target)
          } else {
            let targetRepair = structure.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (item) {
                    if(
                       (item.structureType == STRUCTURE_ROAD && item.hits/item.hitsMax < 0.5) ||
                       (item.structureType == STRUCTURE_CONTAINER && item.hits/item.hitsMax < 0.25) ||
                       (item.structureType == STRUCTURE_RAMPART && item.hits/item.hitsMax < 0.0004) ||
                       (item.structureType == STRUCTURE_WALL && item.hits/item.hitsMax < 0.00001)

                    ) {
                        return true
                    }
                    return false
                }
            })
            if(targetRepair && structure.energy/structure.energyCapacity > 0.25){
              structure.repair(targetRepair)
            }

          }
        }
      }

    }
};