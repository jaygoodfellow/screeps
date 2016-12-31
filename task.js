'use strict'
const util = require('./util')
const hud = require('./hud')
module.exports = {
  getTask: function(creep) {
    if(_.isEmpty(creep.memory.job)) creep.memory.job = this.getJob(creep.room)

    let structure = this.getStructure(creep)
    if(_.isEmpty(structure.target)) {
      creep.memory.job = this.getJob(creep.room)
      structure = this.getStructure(creep)
    }

    if (_.sum(creep.carry) > 0 || creep.memory.job == 'explore') {
      return [structure]
    } else {
      let source = this.getSource(structure, creep)
      return [source, structure]
    }

  },
  getStructure: function(creep) {
    let target = null
    let action = creep.memory.job
    if(action == null) action = 'transfer'
    switch(action) {
      case 'build':
        target = hud.findBuild(creep)
        break
      case 'upgradeController':
        target = creep.room.memory.controller[0]
        break
      case 'transfer':
        target = hud.findTransfer(creep)
        break
      case 'repair':
        target = hud.findRepair(creep)
        break
      case 'harvest':
        target = hud.findTransfer(creep)
        break
      case 'explore':
        target = hud.findExplorable(creep)
        break
    }

    if(target == null) {
      target = creep.room.memory.controller[0]
      action= 'upgradeController'
    }

    return {target, action, room: creep.room.name}
  },
  getSource: function(structure, creep) {
    let altSources = {
      'W76N79': ['W76N78']
    }
    let source = null
    let room = creep.room.name
    let finalSites = []

    let altRoom =  _.sample(altSources.room)
    if(structure.action == 'transfer' && typeof altRoom != 'undefined' && typeof Game.rooms[altRoom] != 'undefined') {
      room = _.sample(altSources.room)
    }
    let possibleSites = Game.rooms[room].memory.sources

    let struct = Game.getObjectById(structure.target)
    for(let i of possibleSites) {
      let item = Game.getObjectById(i)
      finalSites.push({
      'site': i,
      distance: Math.abs(Math.sqrt(Math.pow(struct.pos.x - item.pos.x, 2) + Math.pow(struct.pos.y - item.pos.y, 2)))
      })
    }
    let sortedSites = _.sortByOrder(finalSites, 'distance', 'asc')
    return source = {
      target: sortedSites[0].site,
      action: 'harvest',
      room: room
    }
  },
  getJob: function(room) {
    let currentWorkForce = _.countBy(room.memory.jobs)
    for(let i in room.memory.workForce) {
      if(room.memory.workForce[i] == 'transfer') {
        let finalSites = []
        let possibleSites = creep.room.memory.spawns.concat(creep.room.memory.extensions)
        for(let i of possibleSites) {
          let item = Game.getObjectById(i)
          if((item.structureType == 'extension' && item.energy < 50) || (item.structureType == 'spawn' && item.energy < 300) ) {
            finalSites.push(1)
          }
        }
        let current = currentWorkForce[i] || 0
        if(current < room.memory.workForce[i] && finalSites.length > 0) return i
      } else {
        let current = currentWorkForce[i] || 0
        if(current < room.memory.workForce[i]) return i
      }
    }

  }
}