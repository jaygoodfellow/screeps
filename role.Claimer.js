
module.exports = {
    run: function(creep){
     if(creep.room.name != creep.memory.room){
         creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.room)))
     } else {
       if(creep.room.controller) {
         let result = creep.claimController(creep.room.controller)
         console.log(result)
           if(result == ERR_NOT_IN_RANGE) {
               creep.moveTo(creep.room.controller)
           }
       }
     }
   }

}