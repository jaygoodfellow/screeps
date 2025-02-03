//NEWBIE LAND
const roleBuilder = require('role.Builder')
const roleFixer = require('role.Fixer')
const roleHarvester = require('role.Harvester')
const roleClaimer = require('role.Claimer')
const roleMover = require('role.Mover')
const roleUpgrader = require('role.Upgrader')
const roleExplorer = require('role.Explorer')
const roleMiner = require('role.Miner')
const roleHauler = require('role.Hauler')
const roleSoldier = require('role.Soldier')
const actionCreate = require('action.Create')
const configRooms = require("config.Rooms"); 
const actionRooms = require("action.Room"); 

module.exports.loop = function () {

  /* ********************************* */
  // 1. Check if we need to create a new creep
  /* ********************************* */
  let workForce = {}

  for (let room in configRooms) {
    let roomConfig = configRooms[room]
    for (let role of roomConfig) {
      if (!workForce[room]) {
        workForce[room] = {}
      }
      if (!workForce[room][role.name]) {
        workForce[room][role.name] = 0
      }
    }
  }

  /* ********************************* */
  // 2.Track ticks
  /* ********************************* */
  if(!Memory.lastTicks) Memory.lastTicks = []
  Memory.lastTicks.push(+new Date())
  Memory.lastTicks = Memory.lastTicks.slice(-250)
 


  /* ********************************* */
  // 3. Clean up memory of dead creeps
  /* ********************************* */
  if(Game.time % 600 == 0) {
    let deletedCreeps = 0
    for (var i in Memory.creeps) {
      if (!Game.creeps[i]) {
        delete Memory.creeps[i];
        deletedCreeps++
      }
    }
    console.log(`Deleted ${deletedCreeps} screeps from memory`)
  }

  /* ********************************* */
  // 4. Take care of Room business
  /* ********************************* */
  for(let room in configRooms) {
    actionRooms(room)
  }

  /* ********************************* */
  // 5. Take care of Creep business
  /* ********************************* */
  for(let name in Game.creeps) {
      let creep = Game.creeps[name]
    
  
    if (!workForce[creep.memory.room]) workForce[creep.memory.room] = {}
      workForce[creep.memory.room][creep.memory.role]++

      if(Game.time % 10 == 0) {
        creep.say(`${creep.memory.role[0]}: ${creep.ticksToLive}` )
      }

      if(creep.memory.role == 'Upgrader') {
        roleUpgrader.run(creep)
      } else if (creep.memory.role == 'Miner') {
        roleMiner.run(creep)
      } else if (creep.memory.role == 'Builder') {
        roleBuilder.run(creep)
      } else if (creep.memory.role == 'Fixer') {
        roleFixer.run(creep)
      } else if (
        creep.memory.role == 'Harvester' || 
        creep.memory.role == 'Harvester2' 
      ) {
        roleHarvester.run(creep)
      } else if (
        creep.memory.role == 'Mover' ||
        creep.memory.role == 'Mover2' ||
        creep.memory.role == 'Mover3'
      ) {
        roleMover.run(creep)
      } else if (creep.memory.role == 'Claimer') {
        roleClaimer.run(creep)
      } else if (creep.memory.role == 'Explorer') {
        roleExplorer.run(creep)
      } else if (creep.memory.role == 'Hauler') {
        roleHauler.run(creep)
      } else if (
        creep.memory.role == "Melee" ||
        creep.memory.role == "Ranged" ||
        creep.memory.role == "Soldier"
      ) {
        roleSoldier.run(creep);
      }

  }

  if (Game.time % 5 == 0) actionCreate.run(workForce)
  


}

