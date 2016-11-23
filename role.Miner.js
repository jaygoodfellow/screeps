
module.exports = {
    run: function(creep){
      let target = creep.pos.getObjectById('57efa00c195b160f02c75110')
      if(creep.pos.x == 9 && creep.pos.y == 26) {
        creep.harvest(target)
      } else {
        creep.moveTo(9,26)
      }
    }
};