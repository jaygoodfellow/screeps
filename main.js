const roleUpgrader = require('role.Upgrader')
const roleBuilder = require('role.Builder')
const roleFixer = require('role.Fixer')
const roleHarvester = require('role.Harvester')
const roleSoldier = require('role.Soldier')
const roleTower = require('role.Tower')
const roleClaimer = require('role.Claimer')
const roleLonghauler = require('role.Longhauler')
const actionCreate = require('action.Create')
const actionHarvest = require('action.Harvest')
const workerOverride = false

module.exports.loop = function () {
  let homeRoom = 'W27N67'

  let workForce = {'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Soldier': 0, 'Longhauler': 0, 'Claimer': 0}
  for(let name in Game.creeps) {
      let creep = Game.creeps[name]
      workForce[creep.memory.role]++

      if(Game.time % 3 == 0) creep.say(`${creep.memory.role[0]}: ${creep.ticksToLive}` )

			if(workerOverride) {
          roleBuilder.run(creep)
      } else {
          if(creep.memory.role == 'Upgrader') {
            roleUpgrader.run(creep)
          } else if (creep.memory.role == 'Builder') {
            roleBuilder.run(creep)
          } else if (creep.memory.role == 'Fixer') {
            roleFixer.run(creep)
          } else if (creep.memory.role == 'Harvester') {
            roleHarvester.run(creep)
          } else if (creep.memory.role == 'Soldier') {
            roleSoldier.run(creep)
          } else if (creep.memory.role == 'Longhauler') {
            roleLonghauler.run(creep)
          } else if (creep.memory.role == 'Claimer') {
            roleClaimer.run(creep)
          }
      }
  }

  actionCreate.run(workForce)
  roleTower.run()


}