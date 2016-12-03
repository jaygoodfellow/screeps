const roleBuilder = require('role.Builder')
const roleFixer = require('role.Fixer')
const roleHarvester = require('role.Harvester')
const roleSoldier = require('role.Soldier')
const roleTower = require('role.Tower')
const roleClaimer = require('role.Claimer')
const roleMover = require('role.Mover')
const roleUpgrader = require('role.Upgrader')
const roleMiner = require('role.Miner')
const roleLonghauler = require('role.Longhauler')
const actionCreate = require('action.Create')
const actionHarvest = require('action.Harvest')
const profiler = require('screeps-profiler')

profiler.enable()
module.exports.loop = function () {
  profiler.wrap(function() {
    let workForce = {
      'W27N66':  {'Miner':0 , 'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Soldier': 0, 'Longhauler': 0, 'Claimer': 0, 'Mover': 0},
      'W26N66': {'Miner':0 ,'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Soldier': 0, 'Longhauler': 0, 'Claimer': 0, 'Mover': 0},
      'W27N67': {'Miner':0 ,'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Soldier': 0, 'Longhauler': 0, 'Claimer': 0, 'Mover': 0},
      'W27N68': {'Miner':0 ,'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Harvester2': 0, 'Soldier': 0, 'Longhauler': 0, 'Claimer': 0, 'Mover': 0},
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name]
        workForce[creep.memory.room][creep.memory.role]++

        if(Game.time % 3 == 0) creep.say(`${creep.memory.role[0]}: ${creep.ticksToLive}` )

        if(creep.memory.role == 'Upgrader') {
          roleUpgrader.run(creep)
        } else if (creep.memory.role == 'Builder') {
          roleBuilder.run(creep)
        // } else if (creep.memory.role == 'Miner') {
        //   roleMiner.run(creep)
        } else if (creep.memory.role == 'Fixer') {
          roleFixer.run(creep)
        } else if (creep.memory.role == 'Harvester' || creep.memory.role == 'Harvester2') {
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

    //if(Game.time % 10 == 0) actionCreate.run(workForce)
    actionCreate.run(workForce)
    roleTower.run()
  });

}