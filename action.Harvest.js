module.exports = {
    run:  function(creep) {
        let dropped = creep.pos.findInRange(FIND_DROPPED_ENERGY,10)

        if(dropped[0]) {
            if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped[0])
            }
        } else {
          let source = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
              filter: function (structure) {
                  if((creep.memory.role == 'Upgrader' && structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 0)) {
                      return true
                  }
                  return false
              }
          })
          if (!source) source = creep.pos.findClosestByRange(FIND_SOURCES)

          if(creep.memory.energySource) {
            let desirableSource = Game.getObjectById(creep.memory.energySource)
            if(desirableSource) source = desirableSource
          }

          if(source.structureType) {
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }

          } else {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }

          }
        }
    }
};