const roleBuilder = require('role.Builder')
const roleFixer = require('role.Fixer')
const roleHarvester = require('role.Harvester')
const roleTower = require('role.Tower')
const roleMover = require('role.Mover')
const roleUpgrader = require('role.Upgrader')
const actionCreate = require('action.Create')
const actionHarvest = require('action.Harvest')
const profiler = require('screeps-profiler')

profiler.enable()
module.exports.loop = function () {
  
  profiler.wrap(function() {

    if(Game.time % 200 == 0){
      _.each(Memory.creeps, creep => {
        if(!Game.creeps[creep]) delete Memory.creeps[creep]
      })
      _.each(Game.rooms, room => {
        room.memory.pieces = {}
        let results = room.lookAtArea(0, 0, 50, 50, true)
        _.each(results, result=> {
          let piece = result.type
          if(piece == 'structure') piece = result.structure.structureType
          if(typeof room.memory.pieces[piece] === "undefined") room.memory.pieces[piece] = []
          room.memory.pieces[piece].push([result[result.type].id, result.x, result.y])
        })
      })
    }
    let workForce = {
      'W27N67': {'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Mover': 0},
      'W27N68': {'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Harvester2': 0, 'Mover': 0},
    }

    for(let name in Game.creeps) {
        let startCpu = Game.cpu.getUsed()
        let creep = Game.creeps[name]
        // if(Game.time % 4 == 0) {creep.say(creep.memory.role)}
        workForce[creep.memory.room][creep.memory.role]++
        if (creep.memory.role == 'Harvester' || creep.memory.role == 'Harvester2') {
          roleHarvester.run(creep)
        } else if (creep.memory.role == 'Builder') {
          roleBuilder.run(creep)
        } else if (creep.memory.role == 'Fixer') {
          roleFixer.run(creep)
        } else if(creep.memory.role == 'Upgrader') {
          roleUpgrader.run(creep)
        } else if (creep.memory.role == 'Mover') {
          roleMover.run(creep)
        }
        var elapsed = Game.cpu.getUsed() - startCpu
        //if(creep.name == 'Spawn_HQ_15811260') console.log(creep.name, creep.memory.working, creep.memory.role, elapsed.toFixed(2))
    }

    if(Game.time % 10 == 0) actionCreate.run(workForce)
    _.each(Game.rooms, room => {
      roleTower.run(room)
    })
  })
}