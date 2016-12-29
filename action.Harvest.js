module.exports = {
    run:  function(creep) {
        var dropped = creep.room.find(FIND_DROPPED_ENERGY);
        if(dropped[0]) {
            if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped[0],{reusePath: 10})
            }
        } else {

          let desirableSource = null
          let source = {}
          if(creep.memory.energySource) {
            desirableSource = Game.getObjectById(creep.memory.energySource)
            if(desirableSource) {
              source = desirableSource
            }
          }

          if(!desirableSource) source = creep.pos.findClosestByRange(FIND_SOURCES)

          if(typeof source.structureType != 'undefined') {
              //creep.transfer(source, RESOURCE_GHODIUM_OXIDE)
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source,{reusePath: 15})
            }
          } else {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source,{reusePath: 15})
            }

          }
        }
    }
};