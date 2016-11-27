
module.exports = {
    run: function(creep){
       if(creep.room.name != creep.memory.room){
           creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.room)))
         }
       else{
        let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)

        //let target = Game.getObjectById('58391b03a1cca8352b869ed4')
         if(target) {
           if(creep.attack(target) == ERR_NOT_IN_RANGE){
             creep.moveTo(target)
           }
         } else {
           target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
               filter: function (structure) {
                   if(structure.structureType != STRUCTURE_CONTROLLER) {
                       return true
                   }
                   return false
               }
           })

           if(creep.attack(target) == ERR_NOT_IN_RANGE){
             creep.moveTo(target)
           } else {
             creep.moveTo(23,23)
           }
         }
      }
    }
};