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
          if(creep.memory.target) {
            let target = Game.getObjectById('58400e84b14a695e0d865421')

            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
          } else {
            let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
            let workOrders = ['58400e84b14a695e0d865421']
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
            creep.memory.target = target
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