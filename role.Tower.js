
module.exports = {
    run: function(room, targets){

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

      const towers = Array.from(room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}}))

      if(sortedHostiles.length > 0 && towers.length > 0) {
        towers[0].attack(Game.getObjectById(hostiles[0].id))
      }
      if(sortedHostiles.length > 3) {
        console.log('make a defender!')
      }
    }
}