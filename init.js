const util = require('./util')
const task = require('./task')

module.exports = {
  run: function(room) {
    this.initVars(room)
    this.longVars(room)
    this.gameVars(room)
  },
  initVars: function(room) {
    let rm = Memory.rooms[room]

    rm.controllerGrowth = (typeof rm.controllerGrowth  == 'undefined') ?  [] : _.takeRight(rm.controllerGrowth, 1000)
    if(typeof rm.controllerProgress != 'undefined')  rm.controllerGrowth.push(Game.rooms[room].controller.progress - rm.controllerProgress)
    rm.controllerProgress = Game.rooms[room].controller.progress

    rm.currentJobs = {}
    for(let i in Game.creeps) {
      let job = Game.creeps[i].memory.job
      rm.currentJobs[job] = ++rm.currentJobs[job] || 1
    }
  },

  longVars: function(room) {
    let rm = Memory.rooms[room]
    if(typeof rm.structures == 'undefined' || Game.time % 50 == 0 || 0 == 0) {

      rm.structures = {}
      const structureResults = Game.rooms[room].lookForAtArea(LOOK_STRUCTURES, 0, 0, 50, 50, true)

      for(let i in structureResults) {
        let s = structureResults[i].structure
        if(typeof rm.structures[s.structureType] == 'undefined') rm.structures[s.structureType] = []
        rm.structures[s.structureType].push(s.id)
      }

      rm.constructionSites = []
      const constructionResults = Game.rooms[room].lookForAtArea(LOOK_CONSTRUCTION_SITES, 0, 0, 50, 50, true)

      for(let i in constructionResults) {
        rm.constructionSites.push(constructionResults[i].constructionSite.id)
      }

      this.garbageCollection(room)
    }
  },

  gameVars: function(room) {
    let rm = Memory.rooms[room]
    if(typeof rm.sources == 'undefined') {
      rm.sources = []
      const sources = Game.rooms[room].lookForAtArea(LOOK_SOURCES, 0, 0, 50, 50, true)
      _.each(sources, source => {
        rm.sources.push(source.source.id)
      })
    }
  },
  garbageCollection: function(room) {

  }
}