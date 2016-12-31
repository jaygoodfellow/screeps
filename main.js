const init = require('./init')
const game = require('./game')
const config = require('./config.Rooms')

for(let i in config) {
  Game.rooms[i].memory.workForce = config[i]
}
module.exports.loop = function () {
  _.each(Game.rooms, room => {
    if(typeof room.memory.workForce != 'undefined') {
      init.run(room)
      game.run(room)
    }
  })

}
