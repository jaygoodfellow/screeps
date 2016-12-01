const actionHarvest = require('action.Harvest')
module.exports = {
    run: function(creep) {
      if(creep.memory.moving && creep.carry.energy == 0) {
          creep.memory.moving = false
      }
      if(!creep.memory.moving && creep.carry.energy == creep.carryCapacity) {
          creep.memory.moving = true
      }
      if(creep.memory.moving) {
          if(creep.room.name == 'W27N68') {
            var target =  Game.getObjectById('583d0a473955c3bf77d29502')
          }else {
            let tower1 = Game.getObjectById('5839152d9bc8c9ea6456797b')
            let tower2 = Game.getObjectById('58351d72eb22d4ca24273a5d')
            if(tower1.energy == 1000 && tower2.energy === 1000) {
              var target =  Game.getObjectById('5835d51f22c10df7453a0a6a')

            } else {
              var target = (tower1.energy/tower1.energyCapacity > tower2.energy/tower2.energyCapacity) ? tower2 : tower1
            }
          }
          if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target)
          }
      }
      else {
          actionHarvest.run(creep)
      }
    }
}