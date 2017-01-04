'use strict'
const util = require('./util')
const hud = require('./hud')
module.exports = {
  getTask: function(creep) {
    if(_.isEmpty(creep.memory.job)) creep.memory.job = this.getJob(creep.room)

    let structure = this.getStructure(creep)

    let source = null

    if (_.sum(creep.carry) > 0) {
      return [structure]
    } else {
      source = this.getSource(structure, creep)
      return [source, structure]
    }

  },
  getStructure: function(creep) {
    switch(creep.memory.job) {
      case 'General':
        let target = hud.findBuild(creep)

        if(target) {
          let room = Game.getObjectById(target).room.name
          return {target, action: 'build', room}
        } else {
          let pool = new Array(1000)
          let repair = hud.findRepair(creep)
          let transfer = hud.findTransfer(creep)
          if(repair) _.fill(pool, {target: repair, action: 'repair'},0, 333)
          _.fill(pool, {target: creep.room.memory.structures.controller[0], action: 'upgradeController'},333, 666)
          if(transfer) _.fill(pool, {target: hud.findTransfer(creep), action: 'transfer'},666, 1000)
          let result = _.sample(_.compact(pool))

          let room = Game.getObjectById(result.target).room.name
          return {target: result.target, action: result.action, room}
        }


        return {target, action, room}
        break
      case 'Digger':
      //source
      //container-storage
        break
      case 'Hauler':
      //container-storage
      //container-storage
        break
      case 'Soldier':
        break
    }
  },

  getSource: function(structure, creep) {
    const altSources = {
      'W76N79': ['W76N78']
    }
    const priority = {
      'build':   [STRUCTURE_STORAGE, STRUCTURE_CONTAINER, LOOK_SOURCES],
      'upgradeController':   [STRUCTURE_CONTAINER, STRUCTURE_STORAGE, LOOK_SOURCES],
      'repair':   [STRUCTURE_STORAGE, STRUCTURE_CONTAINER, LOOK_SOURCES],
      'transfer':   [STRUCTURE_STORAGE, STRUCTURE_CONTAINER]
    }
    let source = null
    let room = creep.room.name
    let finalSites = []

    let altRoom =  _.sample(altSources[room])
    if(creep.memory.job == 'harvest' && typeof altRoom != 'undefined' && typeof Memory.rooms[altRoom] != 'undefined') {
      room = altRoom
    }
    let possibleSites = Memory.rooms[room].sources.concat(Memory.rooms[room].storage || [])

    let struct = Game.getObjectById(structure.target)
    console.log(structure.action)
    for(let i of possibleSites) {
      let item = Game.getObjectById(i)
      if(item == null) item = {pos:{x:0, y:0}} //no clue how this can happen but it does and it breaks things
      let distance = (item == null) ? 0 : Math.abs(Math.sqrt(Math.pow(struct.pos.x - item.pos.x, 2) + Math.pow(struct.pos.y - item.pos.y, 2)))
      finalSites.push({
      site: i,
      action: (typeof item.structureType == 'undefined') ? 'harvest' : 'withdraw',
      priority: priority[structure.action].indexOf(item.structureType || 'source'),
      distance: distance
      })

    }
    let sortedSites = _.sortByOrder(finalSites, ['priority', 'distance'], ['asc', 'asc'])
    return source = {
      target: sortedSites[0].site,
      action: sortedSites[0].action,
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