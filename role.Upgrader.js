const actionHarvest = require('action.Harvest')
module.exports = {
    run: function(creep){
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if(creep.memory.working) {
            let result = creep.upgradeController(creep.room.controller)

            if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {reusePath: 10});
            }
        }
        else {
            actionHarvest.run(creep)
        }
    }
};