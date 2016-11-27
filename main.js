const roleBuilder = require('role.Builder')
const roleFixer = require('role.Fixer')
const roleHarvester = require('role.Harvester')
const roleSoldier = require('role.Soldier')
const roleTower = require('role.Tower')
const roleClaimer = require('role.Claimer')
const roleMover = require('role.Mover')
const roleUpgrader = require('role.Upgrader')
const roleLonghauler = require('role.Longhauler')
const actionCreate = require('action.Create')
const actionHarvest = require('action.Harvest')
const configRooms = require('config.Rooms')

module.exports.loop = function () {
  let homeRoom = 'W27N67'
  for(let r in configRooms) {
    let room = Game.rooms[r]
    if(room) {
      _.each(configRooms[r], role => {
        
      })

    }
  }
  let workForce = {'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Soldier': 0, 'Longhauler': 0, 'Claimer': 0, 'Mover': 0}
  for(let name in Game.creeps) {
      let creep = Game.creeps[name]
      workForce[creep.memory.role]++

      if(Game.time % 3 == 0) creep.say(`${creep.memory.role[0]}: ${creep.ticksToLive}` )

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
      } else if (creep.memory.role == 'Mover') {
        roleMover.run(creep)
      }
  }

  if(Game.time % 10 == 0) actionCreate.run(workForce)
  roleTower.run()


}