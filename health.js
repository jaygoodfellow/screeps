const BASE_SPAWN_COST = 300
const baseParts = {
  'General':  [WORK,WORK,MOVE,CARRY],
  'Worker':  [WORK,MOVE],
  'Transporter': [MOVE,CARRY]
}

module.exports = {
  run: function(room) {
    let scalar = Math.floor(room.energyCapacityAvailable/BASE_SPAWN_COST) - 1
    let job = null
    let creepType = 'General'

    let plannedWorkForce = room.memory.workForce
    let currentWorkForce = _.countBy(room.memory.jobs)

    if(_.sum(currentWorkForce) <= 2 || scalar < 1) scalar = 1

    if(_.sum(currentWorkForce) < _.sum(plannedWorkForce) && room.energyAvailable >= scalar*BASE_SPAWN_COST && room.energyCapacityAvailable > 0) {
      let spawnName = 'Spawn_' + room.name + '_' + Game.time
      let totalParts = []
      for(let i=1; i<=scalar; i++) {
        totalParts = totalParts.concat(baseParts[creepType])
      }
      let result = Game.getObjectById(room.memory.spawns[0]).createCreep(totalParts, spawnName, {job})

    }
  }
}