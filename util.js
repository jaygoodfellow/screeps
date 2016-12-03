module.exports = {
  findClosest: function(creep, structures) {
    let room = creep.room
    let closest = null
    _.each(structures, structure => {
      let items = room.memory.pieces[structure]
      let shortest = [null, 1000]
      _.each(items, item => {
        let current = null
        let max = null
        let distance = Math.abs(Math.sqrt(Math.pow(creep.pos.x - item[1], 2) + Math.pow(creep.pos.y - item[2], 2)))
        let struct = room.lookAt(item[1], item[2])
        switch(structure) {
            case 'extension':
              current = struct[0].structure.energy
              max = 50
              break
            case 'storage':
              current = _.sum(struct[0].store)
              max = 1000000
              break
            case 'tower':
              current = struct[0].energy
              max = 1000
            default:
              break
        }
        if(current < max) {
          shortest = (distance < shortest[1]) ? [item,distance] : shortest
        }
      })
      if(shortest[0]) {
        // console.log(`${creep.name} found ${structure} in ${room} `)
        closest = Game.getObjectById(shortest[0][0])
        return false
      } else {
        // console.log(`${creep.name} has nothing available for ${structure} in ${room} `)
      }
    })
    return closest
  },
  repairStatus: function(room, type) {
    let r = Game.rooms[room]
    let structures = r.memory.pieces[type]
    let status = []
    _.each(structures, structure => {
      let s = Game.getObjectById(structure[0])
      if(s) status.push(s.hits/s.hitsMax)
    })
    return `Min: ${(_.min(status)*100).toFixed(2)}%, Max: ${(_.max(status)*100).toFixed(2)}%, Avg: ${(_.sum(status)/status.length*100).toFixed(2)}%`
  }
}