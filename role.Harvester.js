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
                    if((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity) {
                        return true
                    }
                    return false
                }
            })
            let tower = Game.getObjectById('58351d72eb22d4ca24273a5d')
            if(tower.energy/tower.energyCapacity < 0.8 && creep.name == 'Spawn_15490876') target = tower
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