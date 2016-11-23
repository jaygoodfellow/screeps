
module.exports = {
    run: function(){
      for(let id in Game.structures){
        let structure = Game.structures[id]
        if (structure.structureType == STRUCTURE_TOWER) {
          let targetRepair = structure.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: function (structure) {
                  if(
                     (structure.structureType == STRUCTURE_ROAD && structure.hits/structure.hitsMax < 0.35) ||
                     (structure.structureType == STRUCTURE_CONTAINER && structure.hits/structure.hitsMax < 0.50) ||
                     (structure.structureType == STRUCTURE_RAMPART && structure.hits/structure.hitsMax < 0.005 && tower.energy > 200) ||
                     (structure.structureType == STRUCTURE_WALL && structure.hits/structure.hitsMax < 0.00005 && tower.energy > 200)
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