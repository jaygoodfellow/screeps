
module.exports = {
    run: function(creep){
     if(creep.room.name != creep.memory.room){
         creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.room)))
     } else {
       if(creep.room.controller) {
           if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
               creep.moveTo(creep.room.controller)
           }
       }
     }
   }

}