const configRooms = require('config.Rooms')

module.exports = {
  run:  function(workForce) {
    for (let room in configRooms) {
      let roles = configRooms[room]
      _.each(roles, role =>{

        if (workForce[room][role.name] < role.max) {
          let spawnName = 'Spawn_' + role.spawn + '_' + Game.time

          if(typeof Game.spawns[role.spawn] != 'undefined') {
            let result = Game.spawns[role.spawn].createCreep(role.parts, spawnName, {'role':role.name, 'room':(role.room) ? role.room : room, 'energySource': role.energySource})
            return false
          }
        }
      })
    }
  }
}