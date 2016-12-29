const labour = require('./labour')
const hud = require('./hud')
const health = require('./health')
const dod = require('./dod')

module.exports = {
  run: function(room){
    health.run(room)
    labour.run(room)
    dod.run(room)
  }
}