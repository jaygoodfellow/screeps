const configRooms = require('config.Rooms')

const baseParts = {
  'Worker':  [WORK,MOVE,CARRY],
  'Upgrader': [WORK,WORK,CARRY,MOVE],
  'Claimer': [MOVE,CLAIM,ATTACK],
  'Soldier': [MOVE,ATTACK]
}
const baseCost = {
  'Worker':  200,
  'Upgrader': 300,
  'Claimer': 730,
  'Soldier': 180
}
module.exports = {
  run:  function(workForce) {

    for (let room in configRooms) {
      let roles = configRooms[room]
      let r = Game.rooms[room]
      if(!r) return

      _.each(roles, role =>{
        if (workForce[room][role.name] < role.max) {

          let totalParts = []
          let roleType = ''
          switch (role.name) {
            case 'Claimer':
              roleType = 'Claimer'
              break
            case 'Soldier':
              roleType = 'Soldier'
              break
            case 'Upgrader':
              roleType = 'Upgrader'
              break
            default:
              roleType = 'Worker'
              break
          }

          let scalar = Math.floor(r.energyCapacityAvailable/baseCost[roleType])
          if(scalar > 4) scalar = 4
          if (scalar < 1) scalar = 1
          if(roleType == 'Claimer' || workForce[room]['Harvester'] < 2) scalar = 1


          for(let i=1;i<=scalar;i++){
            totalParts = totalParts.concat(baseParts[roleType])
          }

          let spawnName = 'Spawn_' + role.name + '_' + Game.time
          const spawnBase = Game.spawns['Spawn1']
          if(typeof spawnBase != 'undefined' && Game.rooms[room].energyAvailable >= baseCost[roleType]*scalar) {
            let result = spawnBase.createCreep(totalParts, spawnName, {'role':role.name, 'room':(role.room) ? role.room : room, 'energySource': role.energySource})
            console.log(r.name, result, role.name , baseCost[roleType]*scalar, Game.rooms[room].energyAvailable, scalar, JSON.stringify(totalParts))
            return false
          }
        }
      })
    }
  },
  recruit: function(room, type) {
    let spawnName = 'Spawn_'+type+'_'+ Game.time
    const spawnBase = Game.spawns['Spawn1']
    if(typeof spawnBase != 'undefined' && room.energyAvailable >= 600) {
      let result = spawnBase.createCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE], spawnName, {'role':type, 'room':room})
      console.log(room.name, result, room.energyAvailable, type)
      return false
    }
  }
}