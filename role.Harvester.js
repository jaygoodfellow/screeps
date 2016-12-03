const actionHarvest = require('action.Harvest')
const util = require('util')

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
            if(structure) {
              let current = 0
              let max = 0
              switch(structure.structureType) {
                  case 'extension':
                    current = structure.energy
                    max = 50
                    break
                  case 'storage':
                    current = _.sum(structure.store)
                    max = 1000000
                    break
                  case 'tower':
                    current = structure.energy
                    max = 1000
                  default:
                    break
              }
              if(current == max) creep.memory.target = null
            } else {
              creep.memory.target = null
            }
          }
          if(!creep.memory.target) {
            creep.memory.target = util.findClosest(creep, [STRUCTURE_EXTENSION, STRUCTURE_STORAGE, STRUCTURE_TOWER])
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