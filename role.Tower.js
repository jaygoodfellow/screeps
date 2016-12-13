
module.exports = {
    run: function(room){
        let finalItems = []
        let roads = room.memory.pieces.road || []
        let ramparts = room.memory.pieces.rampart || []
        let inRepair = roads.concat(ramparts)
        _.each(inRepair, item =>  {
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

        let targetRepair = Game.getObjectById(repairItem[0])
        if(targetRepair.hits/targetRepair.hitsMax < 0.50 && tower.energy/tower.energyCapacity > 0.50){
          let result = tower.repair(targetRepair)
        }

      })
    }
}