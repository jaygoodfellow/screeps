const actionHarvest = require('action.Harvest')
module.exports = {
    run: function(creep) {

      if(creep.memory.working && creep.carry.energy == 0) {
          creep.memory.working = false
      }
      if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
          creep.memory.working = true
      }
      if(creep.memory.working) {
          if(creep.room.name == 'W27N68') {
            var t1 =  Game.getObjectById('583d0a473955c3bf77d29502')
            var t2 =  Game.getObjectById('5844767e423b498f11acf626')
            if(t1.energy == 1000 && t2.energy === 1000) {
              var target =  Game.getObjectById('5840fab34ef49db425671d8d')
            } else {
              var target = (t1.energy/t1.energyCapacity > t2.energy/t2.energyCapacity) ? t2 : t1
            }
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
              creep.moveTo(target,{reusePath: 10})
          }
      }
      else {
          actionHarvest.run(creep)
      }
    }
}