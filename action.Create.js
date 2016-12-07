const configRooms = require('config.Rooms')
const BASE_SPAWN_COST = 200
const baseParts = {
  'Worker':  [WORK,MOVE,CARRY]
}
module.exports = {
  run:  function(workForce) {
    for (let room in configRooms) {
      let roles = configRooms[room]
      let r = Game.rooms[room]
      let scalar = Math.floor(r.energyCapacityAvailable/BASE_SPAWN_COST)
      if(scalar > 4) scalar = 2
      if (_.sum(workForce[room]) < 3 || scalar < 1) scalar = 1

      let totalParts = []
      for(let i=1;i<=scalar;i++){
        totalParts = totalParts.concat(baseParts['Worker'])
      }

      _.each(roles, role =>{
        if (workForce[room][role.name] < role.max) {
          let spawnName = 'Spawn_' + role.spawn + '_' + Game.time
          if(typeof Game.spawns[role.spawn] != 'undefined' && Game.rooms[room].energyAvailable >= 300) {
            let result = Game.spawns[role.spawn].createCreep(totalParts, spawnName, {'role':role.name, 'room':(role.room) ? role.room : room, 'energySource': role.energySource})
            return false
          }
        }
      })
    }
  }
}