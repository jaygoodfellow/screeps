module.exports = {
    run: function(creep) {
        console.log(creep.name)
        if (creep.room.name != creep.memory.room) {
            creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.room)))
        } else {
            let target = Game.getObjectById(creep.memory.target) 
            if(creep.claimController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
            }
        }
     
    }
}