const BASE_SPAWN_COST = 200
const baseParts = {
  'Worker':  [WORK,MOVE,CARRY],
  'Transporter': [MOVE,CARRY,CARRY],
  'Explorer': [MOVE,TOUGH]
}

module.exports = {
  run: function(room) {
    let scalar = Math.floor(room.energyCapacityAvailable/BASE_SPAWN_COST)

    if(_.size(room.memory.jobs) < _.sum(room.memory.workForce) && room.energyAvailable >= scalar*BASE_SPAWN_COST && room.energyCapacityAvailable > 0) {
      let spawnName = 'Spawn_' + room.name + '_' + Game.time
      let totalParts = []
      for(let i=1; i<=scalar; i++) {
        totalParts = totalParts.concat(baseParts['Worker'])
      }

      let result = Game.getObjectById(room.memory.spawns[0]).createCreep(totalParts, spawnName)
    }
  }
}