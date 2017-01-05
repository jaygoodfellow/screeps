
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
  'Worker':  {
    baseCost: 300,
    baseParts: [WORK,WORK,MOVE,CARRY]
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
        const currentJobCount = rm.currentJobs[job] || 0
        const expectedJobCount = rm.plannedJobs[job]

        if(currentJobCount < expectedJobCount) {

          let scalar = Math.floor(Game.rooms[room].energyCapacityAvailable/DNA[job].baseCost) - 1

          if(_.sum(rm.currentJobs) <= 2 || scalar < 1) scalar = 1
          if(Game.rooms[room].energyAvailable >= scalar * DNA[job].baseCost) {
            const spawnName = `${room}_${job}_${Game.time}`
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