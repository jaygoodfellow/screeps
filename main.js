'use strict'
const Room = require('Room')
const Job = require('Job')
const HelperFunctions = require('HelperFunctions')

module.exports.loop = function () {
  HelperFunctions.initMemory()

  let job = new Job()
  for(var i in Game.rooms) {
    const room = new Room(i)

    let creeps = room.getCreeps()
    for(let i in creeps) {
      let creep = creeps[i]


      job.perform(creep, room)

    }
    let result = null

  }

  HelperFunctions.garbageCollection()
}

