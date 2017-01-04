const labour = require('./labour')
const hud = require('./hud')
const health = require('./health')
const dod = require('./dod')

module.exports = {
  run: function(room){
    let rm = Memory.rooms[room]

    if(Game.time % 50 == 0) {
      let avg = _.sum(rm.controllerGrowth)/_.size(rm.controllerGrowth)
      let eta = (Game.rooms[room].controller.progressTotal - Game.rooms[room].controller.progress)/avg*3.5/60/60
      console.log('controller upgrade in ',  eta.toFixed(2), ' hours')
    }

    health.run(room)
    labour.run(room)
    dod.run(room)
  }
}