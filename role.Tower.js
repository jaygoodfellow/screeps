
module.exports = {
    run: function(){
      for(let id in Game.structures){
        let structure = Game.structures[id]
        if (structure.structureType == STRUCTURE_TOWER) {
          let targetRepair = structure.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: function (item) {
                  if(
                     (item.structureType == STRUCTURE_ROAD && item.hits/item.hitsMax < 0.8) ||
                     (item.structureType == STRUCTURE_CONTAINER && item.hits/item.hitsMax < 0.50) ||
                     (item.structureType == STRUCTURE_RAMPART && item.hits/item.hitsMax < 0.02 && structure.energy > 200) ||
                     (item.structureType == STRUCTURE_WALL && item.hits/item.hitsMax < 0.0001 && structure.energy > 200)
                  ) {
                      return true
                  }
                  return false
              }
          })
          if(targetRepair){
            structure.repair(targetRepair)
          }
        }
      }

    }
};