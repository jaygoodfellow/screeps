
module.exports = {
  run: function(creep){
    if(creep.room.name != 'W26N67'){
      //creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.room)))
      creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo('W26N67')))
    } else{
      //let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
      let target = Game.getObjectById('58382e4e4aec2b3512dc8ff6')
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
}