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
    let room = null
    switch(creep.memory.job) {
      case 'General':
        let pool = new Array(1000)
        let build = hud.findBuild(creep)
        let transfer = hud.findTransfer(creep)
        if(build) _.fill(pool, {target: build, action: 'build'}, 0, 500)
        if(transfer) _.fill(pool, {target: transfer, action: 'transfer'}, 500, 1000)
        let result = _.sample(_.compact(pool))
        creep.say(result.action)
        room = Game.getObjectById(result.target).room.name
        return {target: result.target, action: result.action, room}
        break
      case 'Digger':
        room = Game.getObjectById('5836b7328b8b9619519effe5').room.name
        return {target: '5836b7328b8b9619519effe5', action: 'digger', room, pos: [{x:10,y:4}]}
        break
      case 'Worker':
        room = Game.getObjectById('5836b7328b8b9619519effe6').room.name
        return {target: '5836b7328b8b9619519effe6', action: 'worker', room, pos: [{x:6,y:11},{x:5,y:12}]}
        break
      case 'Tanker':
        var obj = Game.getObjectById('586ac2b0c04c074e4f20072b')
        if(obj.energy == obj.energyCapacity) obj = Game.getObjectById('586d12cd00257e047d1abb03')
        return {target: obj.id, action: 'transfer', room: obj.room.name, pos: [{x:10,y:3}]}
        break
      case 'Hauler':
        let target = Game.getObjectById('586dc2b754a1341036e1b233')
        if(_.sum(target.store) >= target.storeCapacity) {
          target = Game.getObjectById('586d12cd00257e047d1abb03')
        }
        room = target.room.name
        return {target: target.id, action: 'hauler', room}
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
      'transfer':   [STRUCTURE_STORAGE, STRUCTURE_CONTAINER],
      'digger': [LOOK_SOURCES, STRUCTURE_CONTAINER, STRUCTURE_STORAGE],
      'hauler': [STRUCTURE_CONTAINER, LOOK_SOURCES, STRUCTURE_STORAGE],
      'worker': [STRUCTURE_CONTAINER, LOOK_SOURCES, STRUCTURE_STORAGE]
    }
    let source = null
    let room = creep.room.name
    let finalSites = []

    let altRoom =  _.sample(altSources[room])
    if(creep.memory.job == 'harvest' && typeof altRoom != 'undefined' && typeof Memory.rooms[altRoom] != 'undefined') {
      room = altRoom
    }
    switch(structure.action){
      case 'hauler':
        var possibleSites = ['586d1ca054caccee7a2bd79a']
        break
      case 'worker':
        var possibleSites = ['586dc2b754a1341036e1b233']
        break
      default:
        var possibleSites = ['5836b7328b8b9619519effe5']
        break
    }

    if(creep.memory.job == 'General') possibleSites = ['5836b7328b8b9619519effe7']
    let struct = Game.getObjectById(structure.target)


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