const actionHarvest = require('action.Harvest')
module.exports = {
    run:  function(creep) {
        if(creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = false
        }
        if(!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = true
        }
        if(creep.memory.harvesting) {
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (structure) {
                    if((structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity)) {
                        return true
                    }
                    return false
                }
            })
            if(!target) {
              target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                  filter: function (structure) {
                      if( (structure.structureType == STRUCTURE_TOWER && structure.energy/structure.energyCapacity < 1) ) {
                          return true
                      }
                      return false
                  }
              })
            }
            if(!target) {
              target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                  filter: function (structure) {
                      if( (structure.structureType == STRUCTURE_STORAGE)  ) {
                          return true
                      }
                      return false
                  }
              })
            }
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                }
            }
        }
        else {
            actionHarvest.run(creep)
        }
    }
}