module.exports = {
  run: function(room){
    if(typeof Memory.rooms[room] == 'undefined') Memory.rooms[room] = {}

    let items = Game.rooms[room].lookAtArea(0,0,50,50, true)
    Memory.rooms[room]['structures'] = {}
    _.each(items, item => {
      switch(item.type) {
        case 'structure':
          if(typeof Memory.rooms[room]['structures'][item.structure.structureType] == 'undefined')   Memory.rooms[room]['structures'][item.structure.structureType] = []
          Memory.rooms[room]['structures'][item.structure.structureType].push(item.id)
          console.log(JSON.stringify(item))
          break
        case 'terrain':
          type = null
          break
        default:
          if(typeof Memory.rooms[room]['structures'][item.type] == 'undefined') Memory.rooms[room]['structures'][item.type] = []
          Memory.rooms[room]['structures'][item.type].push(item.id)
          break
      }
    })

  }
}