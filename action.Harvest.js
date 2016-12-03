module.exports = {
    run:  function(creep) {
        let dropped = creep.pos.findInRange(FIND_DROPPED_ENERGY,10)
        if(dropped[0] && creep.memory.role != 'Harvester') {
            if(creep.memory.role == 'Miner') {
                dropped = creep.pos.findInRange( FIND_DROPPED_RESOURCES,10)
            } else {
              if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(dropped[0],{reusePath: 10})
              }
            }
        } else {
          let source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: function (structure) {
                  if( ((creep.memory.role == 'Upgrader' || creep.memory.role == 'Builder') && structure.structureType == STRUCTURE_STORAGE && structure.store.energy > 0)) {
                      return true
                  }
                  return false
              }
          })

          if (!source) source = creep.pos.findClosestByRange(FIND_SOURCES)
          if(creep.memory.energySource) {
            let desirableSource = Game.getObjectById(creep.memory.energySource)
            if(desirableSource) {
              if(desirableSource.energy == 0) {
                desirableSource = null
              } else {

                source = desirableSource
              }
            }
          }


          if(typeof source.structureType != 'undefined') {
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