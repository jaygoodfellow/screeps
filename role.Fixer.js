const actionHarvest = require('action.Harvest')
module.exports = {
    harvest: function(creep) {
      if(creep.memory.harvesting && creep.carry.energy == 0) {
          creep.memory.harvesting = false
      }
      if(!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
          creep.memory.harvesting = true
      }
      if(creep.memory.harvesting) {
          let target = Game.getObjectById('58351d72eb22d4ca24273a5d')
          if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target)
          }
      }
      else {
          actionHarvest.run(creep)
      }
    },
    run:  function(creep) {

        if(creep.memory.fixing && creep.carry.energy == 0) {
            creep.memory.fixing = false
        }
        if(!creep.memory.fixing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.fixing = true
        }

        if(creep.memory.fixing) {

            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (structure) {
                    if(
                      (structure.structureType == STRUCTURE_RAMPART && structure.hits < 150000) ||
                      (structure.structureType == STRUCTURE_WALL && structure.hits < 150000) ||
                      (structure.structureType == STRUCTURE_ROAD && structure.hits/structure.hitsMax < 0.50)
                    ) {
                        return true
                    }
                    return false
                }
            })
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                }
            } else {
                let storage = Game.getObjectById('58351d72eb22d4ca24273a5d')
                if(storage.energy/storage.energyCapacity > 0.5) {
                  storage = Game.getObjectById('583910965264786f08937ae4')
                } else {
                  storage = Game.getObjectById('5835d51f22c10df7453a0a6a')
                }
                if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage)
                }
            }
        }
        else {
          if(creep.room.name != creep.memory.room){
              creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.room)))
          } else {
           let source = creep.pos.findClosestByRange(FIND_SOURCES)
           if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
               creep.moveTo(source)
           }
          }
        }
    }
}