const actionHarvest = require('action.Harvest')
module.exports = {
    run:  function(creep) {

        if(creep.memory.fixing && creep.carry.energy == 0) {
            creep.memory.fixing = false
        }
        if(!creep.memory.fixing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.fixing = true
        }

        if(creep.memory.fixing) {

            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (structure) {
                    if(
                      (structure.structureType == STRUCTURE_RAMPART && structure.hits < 25000) ||
                      (structure.structureType == STRUCTURE_WALL && structure.hits < 25000) ||
                      (structure.structureType == STRUCTURE_CONTAINER && structure.hits < 75000) ||
                      (structure.structureType == STRUCTURE_ROAD && structure.hits/structure.hitsMax < 0.5)
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
                let storage = Game.getObjectById('5835d51f22c10df7453a0a6a')
                if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {reusePath: 10})
                }
            }
        }
        else {
          if(creep.room.name != creep.memory.room){
              creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.room)))
          } else {
           let source = creep.pos.findClosestByRange(FIND_SOURCES)
           if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
               creep.moveTo(source, {reusePath: 10})
           }
          }
        }
    }
}