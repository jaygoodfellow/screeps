const roleUpgrader = require('role.Upgrader')
const roleBuilder = require('role.Builder')
const roleFixer = require('role.Fixer')
const roleHarvester = require('role.Harvester')
const roleMiner = require('role.Miner')
const actionCreate = require('action.Create')

const workerOverride = false

module.exports.loop = function () {
    let workForce = {'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Miner': 0}
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
            } else if (creep.memory.role == 'Miner') {
              roleMiner.run(creep)
            }
        }
    }
    actionCreate.run(workForce)
    //new tower fixing code
    let tower = Game.getObjectById('58351d72eb22d4ca24273a5d')
    let target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function (structure) {
            if(structure.structureType == 'road' && structure.hits/structure.hitsMax < 0.20) {
                return true
            }
            return false
        }
    })
    if(target){
      tower.repair(target)
    }
}