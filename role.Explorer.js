const actionHarvest = require('action.Harvest')
module.exports = {
    run:  function(creep) {

    if (creep.room.name != creep.memory.room) {
      creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { reusePath: 5 })
      // if (Game.time % 30 == 0) console.log(`Moving to ${creep.memory.room}. Currently at ${creep.pos} with ${creep.ticksToLive} ticks to live`)
      return
  } else {
      if (creep.memory.position && creep.hits == creep.hitsMax) {
        creep.moveTo(new RoomPosition(creep.memory.position[0], creep.memory.position[1], creep.memory.room), { reusePath: 5 })
        return
      }
      // if (Game.time % 30 == 0) console.log(`In my room ${creep.room.name} with ${creep.ticksToLive} ticks to live`)

      // const r = creep.heal(Game.creeps['E23N3_Upgrader_815080'])
      // if (r == ERR_NOT_IN_RANGE) creep.moveTo(Game.creeps['E23N3_Upgrader_815080'])
      //   return
    let hostile = null;
    if (creep.memory.position && creep.hits == creep.hitsMax) {
        creep.moveTo(creep.memory.position[0], creep.memory.position[1])
        return
    }
    hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    if(!hostile) hostile = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, 10)

    if (hostile) {
      const result = creep.rangedAttack(hostile)
      console.log(`attacking ${hostile} with ${result}`)
      if (result == ERR_NOT_IN_RANGE) {
        if (creep.hits < creep.hitsMax) {
          creep.heal(creep)
          return
        }
        creep.moveTo(hostile, { reusePath: 5 })
      }
      return
    }

    }

  }
}

