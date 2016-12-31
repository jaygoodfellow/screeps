const util = require('./util')
const task = require('./task')

module.exports = {
  run: function(room) {

    this.initVars(room)
    this.longVars(room)
    this.gameVars(room)
  },
  initVars: function(room) {
    room.memory.creeps = []
    room.memory.jobs = []
    room.memory.tasks = []
    room.memory.controllerGrowth = (typeof room.memory.controllerGrowth  == 'undefined') ?  [] : _.takeRight(room.memory.controllerGrowth, 500)
    if(typeof room.memory.controllerProgress != 'undefined')  room.memory.controllerGrowth.push(room.controller.progress-room.memory.controllerProgress)
    room.memory.controllerProgress = room.controller.progress

    let avg = _.sum(room.memory.controllerGrowth)/_.size(room.memory.controllerGrowth)
    let eta = (room.controller.progressTotal-room.controller.progress)/avg*3.5/60
    if(Game.time % 50 == 0) console.log('controller upgraded in ',  eta.toFixed(0), ' minutes')
    const results = room.lookForAtArea(LOOK_CREEPS, 0, 0, 50, 50, true)
    _.each(results, result => {
      let creep = result.creep
      if(creep.owner.username != 'Invader') {
        if(typeof creep.memory.tasks == 'undefined') creep.memory.tasks = []
        if(creep.memory.tasks.length == 0) creep.memory.tasks = task.getTask(creep)

        room.memory.creeps.push(creep.id)
        room.memory.jobs.push(creep.memory.job)
        room.memory.tasks.push(creep.memory.tasks[0].target)
        if(Game.time % 10 == 0) creep.say(creep.memory.job[0] + ': ' + creep.ticksToLive)
      }
    })

  },

  longVars: function(room) {

    if(typeof room.memory.roads == 'undefined' || Game.time % 50 == 0 || 0 == 0) {
      room.memory.roads = []
      room.memory.extensions = []
      room.memory.ramparts = []
      room.memory.walls = []
      room.memory.towers = []
      room.memory.storage = []
      const structures = room.lookForAtArea(LOOK_STRUCTURES, 0, 0, 50, 50, true)
      _.each(structures, structure => {
        if(structure.structure.structureType == STRUCTURE_ROAD) room.memory.roads.push(structure.structure.id)
        if(structure.structure.structureType == STRUCTURE_WALL) room.memory.walls.push(structure.structure.id)
        if(structure.structure.structureType == STRUCTURE_RAMPART) room.memory.ramparts.push(structure.structure.id)
        if(structure.structure.structureType == STRUCTURE_EXTENSION) room.memory.extensions.push(structure.structure.id)
        if(structure.structure.structureType == STRUCTURE_TOWER) room.memory.towers.push(structure.structure.id)
        if(structure.structure.structureType == STRUCTURE_STORAGE) room.memory.storage.push(structure.structure.id)
      })

      room.memory.constructionSites = []
      const sites = room.lookForAtArea(LOOK_CONSTRUCTION_SITES, 0, 0, 50, 50, true)
      _.each(sites, site => {
        room.memory.constructionSites.push(site.constructionSite.id)
      })

      this.garbageCollection(room)
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
    for(let i in Memory.creeps) {
      if(!Game.creeps[i]) delete Memory.creeps[i]
    }
  }
}