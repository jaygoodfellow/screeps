
const DNA = {
  'General':  {
    baseCost: 800,
    baseParts: [WORK,WORK,WORK,WORK,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY],
    //baseParts: [WORK,WORK,MOVE,MOVE,CARRY,CARRY],
    scalar: 1
  },
  'Digger':  {
    baseCost: 450,
    baseParts: [WORK,WORK,WORK,WORK,MOVE],
    scalar: 1
  },
  'Hauler': {
    baseCost: 150,
    baseParts: [MOVE,CARRY,CARRY],
    scalar: 2
  },
  'Worker':  {
    baseCost: 700,
    baseParts: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,CARRY,MOVE,CARRY],
    //baseParts: [WORK,WORK,WORK,WORK,MOVE,CARRY],
    scalar: 1
  },
  'Soldier': {
    baseCost: 130,
    baseParts: [MOVE,ATTACK]
  },
  'Tanker': {
    baseCost: 200,
    baseParts: [WORK,MOVE,CARRY],
    scalar: 1
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

          let scalar = DNA[job].scalar || Math.floor(Game.rooms[room].energyCapacityAvailable/DNA[job].baseCost)

          if(_.sum(rm.currentJobs) <= 2 || scalar < 1) scalar = 1

          if(Game.rooms[room].energyAvailable >= scalar * DNA[job].baseCost) {
            const spawnName = `${room}_${job}_${Game.time}`
            let totalParts = []
            for(let i=1; i<=scalar; i++) {
              totalParts = totalParts.concat(DNA[job].baseParts)
            }
            this.create({
              totalParts, spawnName, job, room
            })
            break
          }

        }
      }

    }
  },
  create: function(options) {
    let result = Game.getObjectById(Memory.rooms[options.room].structures.spawn[0]).createCreep(options.totalParts, options.spawnName, {job: options.job})
    if(typeof result == 'string') console.log(result)
  }
}