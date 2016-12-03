const roleBuilder = require('role.Builder')
const roleFixer = require('role.Fixer')
const roleHarvester = require('role.Harvester')
const roleTower = require('role.Tower')
const roleMover = require('role.Mover')
const roleUpgrader = require('role.Upgrader')
const actionCreate = require('action.Create')
const actionHarvest = require('action.Harvest')

module.exports.loop = function () {
  let workForce = {
    'W27N67': {'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Mover': 0},
    'W27N68': {'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Harvester2': 0, 'Mover': 0},
  }

  for(let name in Game.creeps) {
      let creep = Game.creeps[name]
      workForce[creep.memory.room][creep.memory.role]++

      if(Game.time % 3 == 0) creep.say(`${creep.memory.role[0]}: ${creep.ticksToLive}` )

      if(creep.memory.role == 'Upgrader') {
        roleUpgrader.run(creep)
      } else if (creep.memory.role == 'Builder') {
        roleBuilder.run(creep)
      } else if (creep.memory.role == 'Fixer') {
        roleFixer.run(creep)
      } else if (creep.memory.role == 'Harvester' || creep.memory.role == 'Harvester2') {
        roleHarvester.run(creep)
      } else if (creep.memory.role == 'Mover') {
        roleMover.run(creep)
      }
  }

  if(Game.time % 10 == 0) actionCreate.run(workForce)
  _.each(Game.rooms, room => {
    roleTower.run(room)
  })
}