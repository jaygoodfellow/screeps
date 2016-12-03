const actionHarvest = require('action.Harvest')
module.exports = {
    run:  function(creep) {

        if(creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = false
        }
        if(!creep.memory.harvesting && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.harvesting = true
        }
        let target = null
        if(creep.memory.harvesting) {

          if(creep.memory.target) {
            let structure = Game.getObjectById(creep.memory.target.id)
            if(structure) if(structure.energy == structure.energyCapacity) creep.memory.target = []
          }


          if(creep.memory.target.length == 0){
            target = creep.pos.findInRange(FIND_STRUCTURES, {
                filter: function (structure) {
                  console.log(structure.structureType)
                    if((structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity)) {
                        return true
                    }
                    return false
                }
            })

            if(target.length == 0) {
              target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                  filter: function (structure) {
                      if( (structure.structureType == STRUCTURE_STORAGE) ) {
                          return true
                      }
                      return false
                  }
              })
            }

            if(!target) {
              target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                  filter: function (structure) {
                      if( (structure.structureType == STRUCTURE_TOWER && structure.energy/structure.energyCapacity < 0.75) ) {
                          return true
                      }
                      return false
                  }
              })
            }
            creep.memory.target = target
          }

          target = Game.getObjectById(creep.memory.target.id)
          if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target, {reusePath: 10})
          }

        }
        else {

            actionHarvest.run(creep)
        }
    }
}