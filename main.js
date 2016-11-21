const roleUpgrader = require('role.Upgrader')
const roleBuilder = require('role.Builder')
const roleFixer = require('role.Fixer')
const roleHarvester = require('role.Harvester')
const roleMiner = require('role.Miner')

const workerOverride = false

module.exports.loop = function () {
    let workForce = {'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0}
		let totalCreeps = 0
    let spawn1 = Game.spawns['HQ']
    let sites = 0

    for(var name in Game.creeps) {
        let creep = Game.creeps[name]
				totalCreeps++

				if(Game.time % 3 == 0) creep.say(`${creep.memory.role[0]}: ${creep.ticksToLive}` )

				if(workerOverride) {
            roleBuilder.run(creep)
        } else {
            if(creep.memory.role == 'Upgrader') {
              roleUpgrader.run(creep)
              workForce.Upgrader++
            } else if (creep.memory.role == 'Builder') {
              roleBuilder.run(creep)
              workForce.Builder++
            } else if (creep.memory.role == 'Fixer') {
              roleFixer.run(creep)
              workForce.Fixer++
            } else if (creep.memory.role == 'Harvester') {
              roleHarvester.run(creep)
              workForce.Harvester++
            } else if (creep.memory.role == 'Miner') {
              roleMiner.run(creep)
              workForce.Miner++
            }
        }
    }

    if(spawn1.canCreateCreep){
      let spawnName = 'Spawn_' + Game.time

			if (workForce.Harvester < 1) {
				spawn1.createCreep([WORK,MOVE,MOVE,CARRY,CARRY], spawnName, {'role':'Harvester'})
      } else if(workForce.Upgrader < 2 && totalCreeps < 8) {
        spawn1.createCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY], spawnName, {'role':'Upgrader'})
      } else if (workForce.Builder < 2 && !_.isEmpty(Game.constructionSites) && totalCreeps < 8) {
        spawn1.createCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY], spawnName, {'role':'Builder'})
      } else if (workForce.Fixer < 2  && totalCreeps < 8) {
        spawn1.createCreep([WORK,MOVE,MOVE,CARRY,CARRY,CARRY], spawnName, {'role':'Fixer'})
      }
    }

}