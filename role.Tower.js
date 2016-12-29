
module.exports = {
    run: function(room){
        let finalItems = []
        if(!room.memory.pieces) return false
        let roads = room.memory.pieces.road || []
        let ramparts = room.memory.pieces.rampart || []
        let inRepair = roads.concat(ramparts)
        _.each(roads, item =>  {
          let r = Game.getObjectById(item[0])

          if (r) finalItems.push({id: item[0], percent: r.hits/r.hitsMax})

        })
        let repairItem = _.pluck(_.sortBy(finalItems, 'percent'), 'id')

      _.each(room.memory.pieces.tower, structure => {
        let tower = Game.getObjectById(structure[0])
        if(Game.time % 10 == 0 || room.memory.hostileCreeps.length > 0) {
          var targets = tower.pos.findInRange(FIND_HOSTILE_CREEPS,25)
          room.memory.hostileCreeps = targets
          if(targets.length > 0) {
            tower.attack(targets[0])
          }
        }
        if(room.name == 'W27N67') repairItem[0] = '5861b2a26a3d726e5be551f9'
        let targetRepair = Game.getObjectById(repairItem[0])
        if(targetRepair.hits/targetRepair.hitsMax < 0.80 && tower.energy/tower.energyCapacity > 0.50){
          let result = tower.repair(targetRepair)
        }

      })
    }
}