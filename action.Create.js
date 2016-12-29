const configRooms = require('config.Rooms')
const BASE_SPAWN_COST = 200
const baseParts = {
  'Worker':  [WORK,MOVE,CARRY],
  'Claimer': [MOVE,CLAIM],
  'Soldier': [MOVE,ATTACK]
}
module.exports = {
  run:  function(workForce) {
    for (let room in configRooms) {
      let roles = configRooms[room]
      let r = Game.rooms[room]
      let scalar = Math.floor(r.energyCapacityAvailable/BASE_SPAWN_COST)
      if(scalar > 4) scalar = 4
      if (_.sum(workForce[room]) < 3 || scalar < 1) scalar = 1


      _.each(roles, role =>{

        if (workForce[room][role.name] < role.max) {
          let totalParts = []
          let roleType = ''
          switch (role.name) {
            case 'Claimer':
              roleType = 'Claimer'
              scalar = 1
              break
            case 'Soldier':
              roleType = 'Soldier'
              scalar = 3
              break
            default:
              roleType = 'Worker'
              break
          }
          for(let i=1;i<=scalar;i++){
            totalParts = totalParts.concat(baseParts[roleType])
          }

          let spawnName = 'Spawn_' + role.spawn + '_' + Game.time
          if(typeof Game.spawns[role.spawn] != 'undefined' && Game.rooms[room].energyAvailable >= 300) {
            let result = Game.spawns[role.spawn].createCreep(totalParts, spawnName, {'role':role.name, 'room':(role.room) ? role.room : room, 'energySource': role.energySource})
            //console.log(r.name, result, Game.rooms[room].energyAvailable, scalar, JSON.stringify(totalParts))
            return false
          }
        }
      })
    }
  }
}