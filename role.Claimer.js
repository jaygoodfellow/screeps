'use strict'
module.exports = {
    run: function(creep){
      if(creep.room.name != 'W26N67'){
        //creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.room)))
        creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo('W26N67')))
      } else{
       if(creep.room.controller) {
         let result = creep.claimController(creep.room.controller)

           if(result == ERR_NOT_IN_RANGE) {
               creep.moveTo(creep.room.controller)
           }
       }
     }
   }

}

