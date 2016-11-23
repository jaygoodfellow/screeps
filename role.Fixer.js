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
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (structure) {
                    if((structure.structureType == STRUCTURE_WALL && structure.hits < 2000) || (structure.structureType == STRUCTURE_ROAD && structure.hits < 4000)) {
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
                creep.memory.role = 'Upgrader'
            }
        }
        else {
            actionHarvest.run(creep)
        }
    }
}