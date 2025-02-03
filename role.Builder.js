const actionHarvest = require('action.Harvest')
module.exports = {
    run:  function(creep) {
      // console.log(creep)
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true
        }
        if(creep.memory.building) {
          if(creep.memory.target) {
            let target = creep.memory.target.id
            let result = creep.build(target)
 
            if(result == ERR_NOT_IN_RANGE) {
              screep.moveTo(targets, { reusePath: 3, visualizePathStyle: { stroke: '#ffffff' } });
            } else if(result == ERR_INVALID_TARGET) {
              creep.memory.target = null
            }
          } else {
            let target =
              Game.getObjectById("677a08f14e09a90029407e65") ||
              Game.getObjectById("677a067e4e09a90029407e53") ||
              Game.getObjectById("677a067f4e09a90029407e54") ||
              Game.getObjectById("677a06894e09a90029407e55") ||
              null
  
            if (!target) target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

            let workOrders = []
            for(let order of workOrders) {
              let workOrder = Game.getObjectById(order)
              if (workOrder) {
                target = workOrder
                break
              }
            }
            if(!target) {
              if(!creep.memory.useless) creep.memory.useless = 0
              creep.memory.useless++

              // console.log(creep.memory.useless)
              if(creep.memory.useless >= 10) {
                creep.memory.useless = 0
                creep.memory.role = 'Harvester';
              }
            }
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {maxRooms: 1, reusePath: 5})
                }
            }
            creep.memory.target = target
          }
        }
        else {

           if(creep.room.name != creep.memory.room){
               creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.room)), { maxRooms: 1, reusePath: 5})
           } else {
              actionHarvest.run(creep)
           }
        }
    }
};