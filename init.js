const util = require('./util')
const task = require('./task')

module.exports = {
  run: function(room) {
    this.garbageCollection(room)
    this.initVars(room)
    this.longVars(room)
    this.gameVars(room)
  },
  initVars: function(room) {
    room.memory.creeps = []
    room.memory.jobs = []
    room.memory.tasks = []

    const results = room.lookForAtArea(LOOK_CREEPS, 0, 0, 50, 50, true)
    _.each(results, result => {
      let creep = result.creep
      if(typeof creep.memory.tasks == 'undefined') creep.memory.tasks = []
      if(creep.memory.tasks.length == 0) creep.memory.tasks = task.getTask(creep)

      room.memory.creeps.push(creep.id)
      room.memory.jobs.push(creep.memory.job)
      room.memory.tasks.push(creep.memory.tasks[0].target)
      if(Game.time % 10 == 0) creep.say(creep.memory.job[0] + ': ' + creep.ticksToLive)
    })
  },

  longVars: function(room) {

    if(typeof room.memory.roads == 'undefined' || Game.time % 50 == 0 || 0 == 0) {
      room.memory.roads = []
      room.memory.extensions = []
      room.memory.ramparts = []
      room.memory.walls = []
      const structures = room.lookForAtArea(LOOK_STRUCTURES, 0, 0, 50, 50, true)
      _.each(structures, structure => {
        if(structure.structure.structureType == 'road') room.memory.roads.push(structure.structure.id)
        if(structure.structure.structureType == 'constructedWall') room.memory.walls.push(structure.structure.id)
        if(structure.structure.structureType == 'rampart') room.memory.ramparts.push(structure.structure.id)
        if(structure.structure.structureType == 'extension') room.memory.extensions.push(structure.structure.id)
      })
      room.memory.constructionSites = []
      const sites = room.lookForAtArea(LOOK_CONSTRUCTION_SITES, 0, 0, 50, 50, true)
      _.each(sites, site => {
        room.memory.constructionSites.push(site.constructionSite.id)
      })


    }
  },

  gameVars: function(room) {
    if(typeof room.memory.sources == 'undefined' || Game.time % 500 == 0) {

      room.memory.controller = [room.controller.id]
      room.memory.sources = []
      room.memory.spawns = []
      const sources = room.lookForAtArea(LOOK_SOURCES, 0, 0, 50, 50, true)
      _.each(sources, source => {
        room.memory.sources.push(source.source.id)
      })
      const spawns = Game.spawns
      _.each(spawns, spawn => {
        Game.rooms[spawn.room.name].memory.spawns.push(spawn.id)
      })
      let targets = room.memory.controller.concat(room.memory.sources)
      let points = targets.reduce(function(a,b)  {
        let p = Game.getObjectById(b)
        a[0] += p.pos.x
        a[1] += p.pos.y
        return a
      },[0,0])
      room.memory.center = [Math.floor(points[0]/targets.length), Math.floor(points[1]/targets.length)]

    }
  },
  garbageCollection: function(room) {
    _.each(Memory.creeps, creep => {
      if(!Game.creeps[creep]) delete Memory.creeps[creep]
    })
  }
}