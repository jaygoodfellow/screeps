
module.exports = {
    run: function(){
      for(let id in Game.structures){
        let structure = Game.structures[id]
        if (structure.structureType == STRUCTURE_TOWER) {
          let targetRepair = structure.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: function (item) {
                  if(
                     (item.structureType == STRUCTURE_ROAD && item.hits/item.hitsMax < 0.6) ||
                     (item.structureType == STRUCTURE_CONTAINER && item.hits/item.hitsMax < 0.25)
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