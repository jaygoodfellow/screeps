const roleUpgrader = require('role.Upgrader')
const roleBuilder = require('role.Builder')
const roleFixer = require('role.Fixer')
const roleHarvester = require('role.Harvester')
const roleSoldier = require('role.Soldier')
const roleMiner = require('role.Miner')
const roleTower = require('role.Tower')
const actionCreate = require('action.Create')
const actionHarvest = require('action.Harvest')
const workerOverride = false

module.exports.loop = function () {
  let homeRoom = 'W27N67'
  for (let r in Game.rooms) {
    let room = Game.rooms[r]

  }

  let workForce = {'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Soldier': 0, 'Longhauler': 0}
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

            if(creep.memory.lonhauling && creep.carry.energy == 0) {
                creep.memory.lonhauling = false;
            }
            if(!creep.memory.lonhauling && creep.carry.energy == creep.carryCapacity) {
                creep.memory.lonhauling = true;
            }

            if(creep.memory.lonhauling) {
               if(creep.room.name != homeRoom){
                   creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(homeRoom)))
               } else {
                 if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(creep.room.controller);
                 }
               }
            }
            else {
               if(creep.room.name != creep.memory.room){
                   creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.room)))
               } else {
                actionHarvest.run(creep)
               }
            }
          }
      }
  }

  actionCreate.run(workForce)
  roleTower.run()


}