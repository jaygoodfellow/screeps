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
    if (_.sum(creep.carry) > 0) {
      return [structure]
    } else {
      let source = this.getSource(structure, creep)
      return [source, structure]
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

  },
  getStructure: function(creep) {

    let targets = []
    let action = creep.memory.job
    switch(action) {
      case 'build':
        target = hud.findBuild(creep)
        break
      case 'upgradeController':
        target = creep.room.memory.controller[0]
        break
      case 'transfer':
        target = hud.findTransfer(creep)
        if(target == null) {
          target = creep.room.memory.controller[0]
          action= 'upgradeController'
        }
        break
      case 'repair':
        target = hud.findRepair(creep)
        break
      default:
        target = creep.room.memory.controller[0]
        break
    }

    return {target, action}
  },
  getSource: function(structure, creep) {
    let source = null

    let finalSites = []
    let possibleSites = creep.room.memory.sources
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
      action: 'harvest'
    }
  }
}