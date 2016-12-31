const BASE_SPAWN_COST = 200
const baseParts = {
  'Worker':  [WORK,MOVE,CARRY],
  'Transporter': [MOVE,CARRY,CARRY],
  'Explorer': [MOVE,TOUGH]
}

module.exports = {
  run: function(room) {
    let scalar = Math.floor(room.energyCapacityAvailable/BASE_SPAWN_COST)
    let job = null
    let creepType = 'Worker'

    let workForce = room.memory.workForce
    let currentWorkForce = _.countBy(room.memory.jobs)
    // let explorers = currentWorkForce.explore || 0
    // if(explorers < room.memory.workForce.explore) {
    //   creepType = 'Explorer'
    //   job = 'explore'
    // }

    if(creepType == 'Explorer' || _.sum(currentWorkForce) <= 2) scalar = 1

    if(_.sum(currentWorkForce) < _.sum(workForce) && room.energyAvailable >= scalar*BASE_SPAWN_COST && room.energyCapacityAvailable > 0) {
      let spawnName = 'Spawn_' + room.name + '_' + Game.time
      let totalParts = []
      for(let i=1; i<=scalar; i++) {
        totalParts = totalParts.concat(baseParts[creepType])
      }

      let result = Game.getObjectById(room.memory.spawns[0]).createCreep(totalParts, spawnName, {job})

    }
  }
}