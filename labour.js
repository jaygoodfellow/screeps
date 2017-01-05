const health = require('./health')
const task = require('./task')
const hud = require('./hud')

module.exports = {
  run: function(room) {
    _.each(Game.creeps, creep => {
      if(_.isEmpty(creep.memory.tasks)) creep.memory.tasks = task.getTask(creep)


      if(creep.spawning == false) {
        let targetRoom = creep.memory.tasks[0].room
        if(targetRoom == creep.room.name) {
          this.perform(creep)
        } else {
          let result = creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(targetRoom)), {reusePath: 25})
        }
      }
    })
  },
  perform: function(creep) {
    let action =  creep.memory.tasks[0].action
    let target = Game.getObjectById(creep.memory.tasks[0].target)
    let result = null
    switch(action) {
      case 'hauler':
        result = creep.transfer(target, RESOURCE_ENERGY)
        if (_.sum(creep.carry) == creep.carryCapacity) creep.memory.tasks.shift()
        break
      case 'digger':
        if(creep.pos.x == 10 && creep.pos.y == 4) {
          result = creep.harvest(Game.getObjectById('5836b7328b8b9619519effe5'))
        } else {
          creep.moveTo(10, 4)
        }
        result = OK
        break
      case 'harvest':
        result = creep[action](target)
        if (_.sum(creep.carry) == creep.carryCapacity) creep.memory.tasks.shift()
        break
      case 'withdraw':
        result = creep[action](target, RESOURCE_ENERGY)
        if (_.sum(creep.carry) == creep.carryCapacity) creep.memory.tasks.shift()
        break
      case 'upgradeController':
      case 'build':
        result = creep[action](target)
        if (_.sum(creep.carry) == 0 ) creep.memory.tasks.shift()
        break
      case 'repair':
        result = creep[action](target)
        let percent = target.hits/ target.hitsMax*100
        if (_.sum(creep.carry) == 0 || percent >= 100 ) creep.memory.tasks.shift()
        break
      case 'transfer':
        result = creep[action](target, RESOURCE_ENERGY)
        if (_.sum(creep.carry) == 0) creep.memory.tasks.shift()
        break
    }

    switch (result) {
      case ERR_NOT_IN_RANGE:
        hud.addSite(creep.room, 'road', creep.pos)
        let result = creep.moveTo(target, {reusePath: 10} )
        break
      case ERR_INVALID_TARGET:
      case ERR_FULL:
      case ERR_NO_PATH:
        creep.memory.tasks.shift()
        break
    }
  }
}