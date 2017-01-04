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
    }
  }
}