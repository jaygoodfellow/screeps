const actionHarvest = require('action.Harvest')
module.exports = {
    run: function(creep){
        if(creep.memory.lonhauling && creep.carry.energy == 0) {
            creep.memory.lonhauling = false;
        }
        if(!creep.memory.lonhauling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.lonhauling = true;
        }

        if(creep.memory.lonhauling) {
           if(creep.room.name != 'W27N67'){
               creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo('W27N67')))
           } else {
             if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(creep.room.controller);
             }
           }
        }
        else {
           if(creep.room.name != creep.memory.room){
               creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.room)))
           } else {
            actionHarvest.run(creep)
           }
        }
    }
};