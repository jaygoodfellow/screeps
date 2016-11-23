
module.exports = {
    run: function(creep){
      let target = Game.getObjectById('57efa00c195b160f02c75110')    
      if(creep.pos.x == 10 && creep.pos.y == 27) {
        creep.harvest(target)
      } else {
        creep.moveTo(10,27)
      }
    }
};