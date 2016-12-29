module.exports = {
  repairStatus: function(room, type) {
    let r = Game.rooms[room]
    let structures = r.memory.pieces[type]
    let status = []
    _.each(structures, structure => {
      let s = Game.getObjectById(structure[0])
      if(s) status.push(s.hits/s.hitsMax)
    })
    return `Min: ${(_.min(status)*100).toFixed(2)}%, Max: ${(_.max(status)*100).toFixed(2)}%, Avg: ${(_.sum(status)/status.length*100).toFixed(2)}%`
  },

  resetTasks: function(room){
    let r = Game.rooms[room]
    r.memory.jobs = []
    _.each(Game.creeps, creep => {
      if(creep.room.name == r.name) {
        creep.memory.tasks = []
      }
    })
    return 'done'
  },
  reset: function(){
    _.each(Game.creeps, creep => {
      creep.suicide()
    })
    _.each(Game.structures, structure => {
      if(structure.structureType != STRUCTURE_SPAWN) structure.destroy()
    })
    _.each(Game.constructionSites, site => {
      site.remove()
    })
    delete Memory.creeps
    delete Memory.rooms
  }
}