const init = require('./init')
const game = require('./game')
const config = require('./config.Rooms')


module.exports.loop = function () {

  if(typeof Memory.rooms == 'undefined') Memory.rooms = {}
  for(let i in config) {
      if(typeof Memory.rooms[i] == 'undefined') Memory.rooms[i] = {}
      if(typeof Game.rooms[i] != 'undefined') {
        Memory.rooms[i].plannedJobs = config[i].jobs
        init.run(i)
        game.run(i)
      }
    }
}
