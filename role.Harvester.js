const actionHarvest = require('action.Harvest')
module.exports = {
    run:  function(creep) {

        if(creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = false
        }
        if(!creep.memory.harvesting && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.harvesting = true
        }
        let target = null

        if(creep.memory.harvesting) {
         
            // const dropTarget = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            // if (dropTarget) {
            //     if (creep.pickup(dropTarget) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(dropTarget);
            //     }
            //     return
            // }


            if(creep.memory.energyTarget) {
                
                creep.memory.target = Game.getObjectById(creep.memory.energyTarget)
                target = Game.getObjectById(creep.memory.target.id)
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { reusePath: 5 })
                }
                return
            }

            if(creep.memory.target) {
                let structure = Game.getObjectById(creep.memory.target.id)
                if(structure) {
                    if(structure.energy == structure.energyCapacity) creep.memory.target = null
                } else {
                    creep.memory.target = null
                }
            }

            // if (!creep.memory.target && creep.room.name == 'E23N3') {
            //     target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //         filter: function (structure) {
            //             if (structure.structureType == STRUCTURE_TERMINAL) {
            //                 return true
            //             }
            //             return false
            //         }
            //     })

            //     creep.memory.target = target
            // }
            if (!creep.memory.target) {

                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (structure) {
                        if (structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity) {
                            return true
                        }
                        return false
                    }
                })

                creep.memory.target = target
            }


            if(!creep.memory.target){

                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (structure) {
                        if ((structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity)) {
                            return true
                        }
                        return false
                    }
                })
                creep.memory.target = target
            }
       

            if (!creep.memory.target) {

                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (structure) {

                        if (structure.structureType == STRUCTURE_TOWER) {
                            if (structure.energy < structure.energyCapacity * 0.8) {

                                return true
                            }
                        }
                        return false
                    }
                })

                creep.memory.target = target
            }
   
  
            if (!creep.memory.target) {

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
            if (!creep.memory.target) {

                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (structure) {
                        if (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity) {
                            console.log(JSON.stringify(structure)) 
                            return true
                        }
                        return false
                    }
                })
                creep.memory.target = target
            }
            if (!creep.memory.target) {
                // console.log(`No target found for ${creep.name} in ${creep.room.name}`)
                return
            }
          target = Game.getObjectById(creep.memory.target.id)
          
          if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target, {reusePath: 5})
          }

        }
        else {

            actionHarvest.run(creep)
        }
    }
}