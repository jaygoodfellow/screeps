
module.exports = {
    run: function(creep){
      var dest = 'W27N67'

       if(creep.room.name != dest){
           creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest)))
       }
       else{
         let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
         //let target = Game.getObjectById('583491f20d5e6e4939b3876e')
         if(target) {
           if(creep.attack(target) == ERR_NOT_IN_RANGE){
             creep.moveTo(target)
           }
         } else {
           creep.moveTo(20,14)
          //  target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES)
          //  if(creep.attack(target) == ERR_NOT_IN_RANGE){
          //    creep.moveTo(target)
          //  }
         }
      }
    }
};