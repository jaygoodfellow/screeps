const actionHarvest = require('action.Harvest')
module.exports = {
    run: function(creep) {
      if(creep.memory.mining && creep.carry.energy == 0) {
          creep.memory.mining = false
      }
      if(!creep.memory.mining && creep.carry.energy == creep.carryCapacity) {
          creep.memory.mining = true
      }
      if(creep.memory.mining) {

        let source = Game.getObjectById('5835d51f22c10df7453a0a6a')
        let result = creep.transfer(source, RESOURCE_ZYNTHIUM )
        if(result == ERR_NOT_IN_RANGE) {
            creep.moveTo(source,{reusePath: 10})
        }
      }
      else {
        var target =  Game.getObjectById('57efa00c195b160f02c75110')
        var result = creep.harvest(target, RESOURCE_ZYNTHIUM)
        if(result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target,{reusePath: 10})
        }

      }
    }
}