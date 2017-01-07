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
    let pos = null
    switch(action) {
      case 'hauler':
        dropped = creep.pos.findInRange( FIND_DROPPED_RESOURCES,4)
        if(dropped[0]) creep.pickup(dropped[0])

        result = creep.transfer(target, RESOURCE_ENERGY)
        if (_.sum(creep.carry) == 0) creep.memory.tasks.shift()
        break
      case 'digger':

        dropped = creep.pos.findInRange( FIND_DROPPED_RESOURCES,1)
        if(dropped[0]) creep.pickup(dropped[0])

        result = creep.harvest(Game.getObjectById('5836b7328b8b9619519effe5'))
        let taskPos = creep.memory.tasks[0].pos[0].x

        if(creep.pos.x == taskPos.x && creep.pos.y == taskPos.y) {
          result = creep.harvest(Game.getObjectById('5836b7328b8b9619519effe5'))
        } else {
          creep.moveTo(taskPos.x, taskPos.y)
        }
        result = OK
        break
      case 'worker':
        result = creep.upgradeController(Game.getObjectById('5836b7328b8b9619519effe6'))

        let currentSpot = creep.memory.tasks[0].pos.filter(function( obj ) {
          return obj.x == creep.pos.x && obj.y == creep.pos.y
        })

        if(!currentSpot) {
          pos = _.sample(creep.memory.tasks[0].pos)
        } else {
          pos = {x: creep.pos.x, y: creep.pos.y}
        }
        if(creep.pos.x == pos.x && creep.pos.y == pos.y) {
          result = creep.upgradeController(Game.getObjectById('5836b7328b8b9619519effe6'))
        } else {
          creep.moveTo(pos.x, pos.y)
        }
        if (_.sum(creep.carry) == 0) creep.memory.tasks.shift()
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