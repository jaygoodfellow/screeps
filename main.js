'use strict'
const Room = require('Room')
const Job = require('Job')
const HelperFunctions = require('HelperFunctions')
const Constructions = require('Constructions')

module.exports.loop = function () {
  HelperFunctions.initMemory()

  let job = new Job()
  let con = new Constructions()
  for(var i in Game.rooms) {
    const room = new Room(i)
    //con.repair(room)
    //room.population()
    //room.defend()
    let creeps = room.getCreeps()
    for(let i in creeps) {
      let creep = creeps[i]
      //job.perform(creep, room)

    }
    let result = null

  }

  HelperFunctions.garbageCollection()
}

