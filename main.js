const roleBuilder = require('role.Builder')
const roleFixer = require('role.Fixer')
const roleHarvester = require('role.Harvester')
const roleTower = require('role.Tower')
const roleMover = require('role.Mover')
const roleClaimer = require('role.Claimer')
const roleSoldier = require('role.Soldier')
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
      'W34S93': {'Melee': 0, 'Fixer': 0, 'Builder': 0, 'Upgrader': 0, 'Harvester': 0, 'Mover': 0, 'Claimer': 0, 'Soldier': 0}
    }
    let time = 0
    for(let name in Game.creeps) {
        let creep = Game.creeps[name]
        //
        // if(creep.room.controller && name == 'Spawn_Upgrader_19083500') {
        //     if(creep.signController(creep.room.controller, "") == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(creep.room.controller);
        //     }
        // }



        if(!workForce[creep.memory.room]) {
          console.log('fail', creep.memory.role)
          creep.memory.room = 'W34S93'
        }
        workForce[creep.memory.room][creep.memory.role]++

        if (creep.memory.role == 'Harvester') {
          roleHarvester.run(creep)
        } else if (creep.memory.role == 'Builder') {
          roleBuilder.run(creep)
        } else if (creep.memory.role == 'Fixer') {
          roleFixer.run(creep)
        } else if(creep.memory.role == 'Upgrader' ) {
          roleUpgrader.run(creep)
        } else if (creep.memory.role == 'Mover') {
          roleMover.run(creep)
        } else if (creep.memory.role == 'Melee') {
          roleSoldier.run(creep)
        } else if (creep.memory.role == 'Claimer') {
          roleClaimer.run(creep)
        }

    }
    let startCpu = Game.cpu.getUsed()
    actionCreate.run(workForce)
    _.each(Game.rooms, room => {
      const targets = room.find(FIND_HOSTILE_CREEPS)

      if(targets.length > 0) {
        if(workForce['Melee'] == 0) actionCreate.recruit(room, 'Melee')
        roleTower.run(room, targets)
      }

    })
    var elapsed = Game.cpu.getUsed() - startCpu
    time += elapsed
    // if(Game.time % 15 == 0) console.log(JSON.stringify(workForce))

  })

}
