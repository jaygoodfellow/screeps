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

            let workOrders = ['5834ef37562492df04a6b5f0','5834ed31562492df04a6b2ff']

            for(let order of workOrders) {
              let workOrder = Game.getObjectById(order)

              if (workOrder.progress !== 'undefined') {
                target = workOrder
                break
              }
            }

            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
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
};