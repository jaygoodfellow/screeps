
const DNA = {
  'General':  {
    baseCost: 200,
    baseParts: [WORK,WORK,MOVE,CARRY]
  },
  'Digger':  {
    baseCost: 350,
    baseParts: [WORK,WORK,WORK,MOVE]
  },
  'Hauler': {
    baseCost: 150,
    baseParts: [MOVE,CARRY,CARRY]
  },
  'Soldier': {
    baseCost: 130,
    baseParts: [MOVE,ATTACK]
  }
}

module.exports = {
  run: function(room) {
    let rm = Memory.rooms[room]

    if(_.sum(rm.currentJobs) < _.sum(rm.plannedJobs)) {
      for(let job in rm.plannedJobs) {
        if(rm.currentJobs[job] || 0 < rm.plannedJobs[job]) {

          let scalar = Math.floor(Game.rooms[room].energyCapacityAvailable/DNA[job].baseCost) - 1
          if(_.sum(rm.currentJobs) <= 2 || scalar < 1) scalar = 1

          if(Game.rooms[room].energyAvailable >= scalar * DNA[job].baseCost) {
            let spawnName = `${room}_${job}_${Game.time}`
            let totalParts = []
            for(let i=1; i<=scalar; i++) {
              totalParts = totalParts.concat(DNA[job].baseParts)
            }
            let result = Game.getObjectById(Memory.rooms[room].structures.spawn[0]).createCreep(totalParts, spawnName, {job})
          }
          break
        }
      }

    }
  }
}