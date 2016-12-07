
module.exports = {
    run: function(room){
      _.each(room.memory.pieces.tower, structure => {
        let tower = Game.getObjectById(structure[0])
        if(Game.time % 10 == 0 || room.memory.hostileCreeps.length > 0) {
          var targets = tower.pos.findInRange(FIND_HOSTILE_CREEPS,25)
          room.memory.hostileCreeps = targets
          if(targets.length > 0) {
            tower.attack(targets[0])
          }
        }
        let road = _.sample(room.memory.pieces.road.concat(room.memory.pieces.rampart))
        if(road) {
          let targetRepair = Game.getObjectById(road[0])
          if(targetRepair && tower.energy/tower.energyCapacity > 0.75){
            let result = tower.repair(targetRepair)
          }
        }
      })
    }
}