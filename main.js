const roleUpgrader = require('role.Upgrader')
const roleBuilder = require('role.Builder')
const roleFixer = require('role.Fixer')
const roleHarvester = require('role.Harvester')
const roleMiner = require('role.Miner')
const actionCreate = require('action.Create')

const workerOverride = false

module.exports.loop = function () {
    let workForce = {'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Miner': 0}
    let controller = Game.getObjectById('57ef9d5d86f108ae6e60da46')
    //console.log(controller.progress)
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
              roleFixer.harvest(creep)
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
    let targetRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function (structure) {
            if(
               (structure.structureType == STRUCTURE_ROAD && structure.hits/structure.hitsMax < 0.25) ||
               (structure.structureType == STRUCTURE_CONTAINER && structure.hits/structure.hitsMax < 0.50) ||
               (structure.structureType == STRUCTURE_RAMPART && structure.hits/structure.hitsMax < 0.002 && tower.energy > 100) ||
               (structure.structureType == STRUCTURE_WALL && structure.hits/structure.hitsMax < 0.00002 && tower.energy > 100)
            ) {
                return true
            }
            return false
        }
    })
    if(targetRepair){
      tower.repair(targetRepair)
    }
}