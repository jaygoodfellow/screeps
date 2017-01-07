const hud = require('./hud')
module.exports = {
  run: function(room) {
    const targets = Game.rooms[room].find(FIND_HOSTILE_CREEPS)
    let hostiles = []
    for(let i in targets) {
      let bodyCount = _.countBy(targets[i].body, 'type')
      hostiles.push({
        id: targets[i].id,
        healer: (typeof bodyCount.heal == 'undefined') ? 0 : 1,
        strength: (typeof bodyCount.heal == 'undefined') ? 0 : bodyCount.heal
      })
    }
    let sortedHostiles = _.sortByOrder(hostiles, ['healer',  'strength'], ['desc', 'desc'])
    if(sortedHostiles.length > 0) {
      for(let j of Memory.rooms[room].structures.tower) {
        let result = Game.getObjectById(j).attack(Game.getObjectById(sortedHostiles[0].id))
      }
    } else {
      if(Game.time % 2 == 0) {
        for(let j of Memory.rooms[room].structures.tower) {
          let tower = Game.getObjectById(j)
          let targetRepair = Game.getObjectById(hud.findRepair(_.sample(Game.creeps)))
          let result = tower.repair(targetRepair)
        }
      }
    }
    if(sortedHostiles.length > 3) {
      this.create({
        totalParts: [MOVE,ATTACK,MOVE,ATTACK], spawnName: `${room}_Soldier_${Game.time}`, job: 'Soldier'
      })
    }
  }
}