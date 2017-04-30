'use strict'
const init = require('init')

module.exports.loop = function () {
  if(typeof Memory.rooms == 'undefined') Memory.rooms = {}
  for(let i in Game.rooms) {
    init.run(i)
  }

  for(let i in Game.creeps){
    console.log(i)
  }
}

