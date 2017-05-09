const actionHarvest = require('action.Harvest')
module.exports = {
    run:  function(creep) {

        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true
        }

        if(creep.memory.working) {

            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (structure) {
                    if(
                      (structure.structureType == STRUCTURE_RAMPART && structure.hits/structure.hitsMax < 0.15) ||
                      (structure.structureType == STRUCTURE_WALL && structure.hits/structure.hitsMax < 0.001) ||
                      (structure.structureType == STRUCTURE_CONTAINER && structure.hits/structure.hitsMax < 0.5) ||
                      (structure.structureType == STRUCTURE_ROAD && structure.hits/structure.hitsMax < 0.75)
                    ) {
                        return true
                    }
                    return false
                }
            })
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {reusePath: 10})
                }
            } else {

                //main storage unit
                // let storage = Game.getObjectById('58dbc3de8283ff5308a3e344')
                // if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(storage, {reusePath: 10})
                // }
            }
        }
        else {

          if(creep.room.name != creep.memory.room){
              creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.room)), {reusePath: 10})
          } else {

           actionHarvest.run(creep)
          }

        }
    }
}