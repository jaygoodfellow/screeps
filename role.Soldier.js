
module.exports = {
  run: function(creep){
    const targets = Game.rooms[creep.memory.room].find(FIND_HOSTILE_CREEPS)
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
      const target = Game.getObjectById(sortedHostiles[0].id)
      if(creep.attack(target) == ERR_NOT_IN_RANGE){

        creep.moveTo(target,{reusePath: 15})
      }
    }
  }
}
