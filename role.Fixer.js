const actionHarvest = require('action.Harvest')
module.exports = {
    run:  function(creep) {

        if(creep.memory.fixing && creep.carry.energy == 0) {
            creep.memory.fixing = false
        }
        if(!creep.memory.fixing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.fixing = true
        }

        if(creep.memory.fixing) {
            
            let t = 
                creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (item) {
                        if(
                            (item.structureType == STRUCTURE_ROAD && item.hits / item.hitsMax < 0.8) ||
                            (item.structureType == STRUCTURE_RAMPART && item.hits / item.hitsMax < Memory.rooms[creep.room.name].minRampart ) ||
                            (item.structureType == STRUCTURE_WALL && item.hits / item.hitsMax < Memory.rooms[tower.room.name].minwall) ||
                            (item.structureType == STRUCTURE_STORAGE && item.hits / item.hitsMax < 0.85) ||
                            (item.structureType == STRUCTURE_CONTAINER && item.hits / item.hitsMax < 0.85)
                                   
                        ) {
                        return true
                        }
                        return false
                    }
                })
                const ids = [];
                if (t) ids.push(t.id)
                const objectId = _.sample(ids)
             const target = Game.getObjectById(objectId)
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {reusePath: 5})
                }
            } else {
                // if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(storage, {reusePath: 5})
                // }
            }
        }
        else {
          if(creep.room.name != creep.memory.room){
              creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.room)))
          } else {
           let source = creep.pos.findClosestByRange(FIND_SOURCES)
           if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
               creep.moveTo(source, {reusePath: 5})
           }
          }
        }
    }
}