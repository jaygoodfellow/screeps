const actionHarvest = require('action.Harvest')
module.exports = {
    run: function(creep) {
      // if(creep.room.controller) {
      //     if(creep.signController(creep.room.controller, "") == ERR_NOT_IN_RANGE) {
      //         creep.moveTo(creep.room.controller);
      //     }
      // }
      if(creep.memory.moving && creep.carry.energy == 0) {
          creep.memory.moving = false
      }
      if(!creep.memory.moving && creep.carry.energy == creep.carryCapacity) {
          creep.memory.moving = true
      }
      if(creep.memory.moving) {

        let target = creep.memory.target ? Game.getObjectById(creep.memory.target) : null
      if (creep.memory.energyTarget) {

        creep.memory.target = Game.getObjectById(creep.memory.energyTarget)
        target = Game.getObjectById(creep.memory.target.id)
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { reusePath: 5 })
        }
        return
      }
      
      


      if (!target) {
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: function (structure) {
            if (structure.structureType == STRUCTURE_TOWER && structure.energy / structure.energyCapacity < 0.80) {
              return true
            }
            return false
          }
        })

        creep.memory.target = target
      }
      if (!target) {
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: function (structure) {
            if (structure.structureType == STRUCTURE_STORAGE) {
              return true
            }
            return false
          }
        })

        creep.memory.target = target
      }

      if(!target) {
        target = Game.creeps[creep.name].room.storage 
      }
      if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target,{reusePath: 5})
      }
    }
    else {
        // console.log(creep.pos)
        actionHarvest.run(creep)
    }
  }
}