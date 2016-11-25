
module.exports = {
    run: function(creep){
       if(creep.room.name != creep.memory.room){
           creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.room)))
         }
       else{
        let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        //let target = Game.getObjectById('583326765843e49119800424')
         if(target) {
           if(creep.attack(target) == ERR_NOT_IN_RANGE){
             creep.moveTo(target)
           }
         } else {
           target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES)
           if(creep.attack(target) == ERR_NOT_IN_RANGE){
             creep.moveTo(target)
           } else {
             creep.moveTo(20,14)
           }
         }
      }
    }
};