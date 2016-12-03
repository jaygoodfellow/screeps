
module.exports = {
    run: function(){
      for(let id in Game.structures){
        let structure = Game.structures[id]
        if (structure.structureType == STRUCTURE_TOWER) {
          var targets = structure.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
          let target = structure.pos.findInRange(FIND_HOSTILE_CREEPS)
          if(target.length > 0) {
            structure.attack(target[0])
          } else {
            let targetRepair = structure.pos.findInRange(FIND_STRUCTURES, {
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
            if(targetRepair.length > 0 && structure.energy/structure.energyCapacity > 0.25){
              structure.repair(targetRepair[0])
            }

          }
        }
      }

    }
};