
module.exports = {
  run: function(room) {
    if(Game.time % 50 == 0) {
      let avg = _.sum(Memory.rooms[room].controllerGrowth)/_.size(Memory.rooms[room].controllerGrowth)
      let eta = (Game.rooms[room].controller.progressTotal - Game.rooms[room].controller.progress)/avg*3.5/60/60
      console.log('controller upgrade in ',  eta.toFixed(2), ' hours')
    }
  }
}