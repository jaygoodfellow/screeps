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
          if(creep.memory.target) {
            let target = creep.memory.target.id
            let result = creep.build(target)
            if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {reusePath: 10})
            } else if(result == ERR_INVALID_TARGET) {
              creep.memory.target = null
            }
          } else {
            let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)

            let workOrders = []
           if(creep.room.name == 'W34S93') workOrders = ['5915968bae6c725e61c92a10']
            for(let order of workOrders) {
              let workOrder = Game.getObjectById(order)
              if (workOrder) {
                target = workOrder
                break
              }
            }
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {reusePath: 10})
                }
            }
            creep.memory.target = target
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
};