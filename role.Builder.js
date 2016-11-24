const actionHarvest = require('action.Harvest')
module.exports = {
    run:  function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true
        }
        if(creep.memory.building) {
            let target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)

            let workOrders = []

            for(let order of workOrders) {
              let workOrder = Game.getObjectById(order)
              if (workOrder) {
                target = workOrder
                break
              }
            }

            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                }
            }
        }
        else {
          actionHarvest.run(creep)
          // var dest = 'W27N67'
          //  if(creep.room.name != dest){
          //      creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest)))
          //  } else {
          //   actionHarvest.run(creep)
          //  }
        }
    }
};