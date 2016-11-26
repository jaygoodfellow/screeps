
module.exports = {
    run: function(creep){
       if(creep.room.name != creep.memory.room){
           creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.room)))
         }
       else{
        //let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        let target = Game.getObjectById('5839454aefd62dc20fa465f7')
         if(target) {
           if(creep.attack(target) == ERR_NOT_IN_RANGE){
             creep.moveTo(target)
           }
         } else {
           target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
               filter: function (structure) {
                   if(structure.structureType != STRUCTURE_CONTROLLER) {
                     console.log(structure.structureType)
                       return true
                   }
                   return false
               }
           })

           if(creep.attack(target) == ERR_NOT_IN_RANGE){
             creep.moveTo(target)
           } else {
             //creep.moveTo(23,23)
           }
         }
      }
    }
};