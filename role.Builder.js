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

            let workOrders = ['5835685ac8012784246ab217', '58356909c8012784246ab2cc', '58356909c8012784246ab2ce', '583568bbc8012784246ab283']

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
            } else {
              creep.memory.role = 'Upgrader'
            }
        }
        else {
          actionHarvest.run(creep)
        }
    }
};