const labour = require('./labour')
const health = require('./health')
const dod = require('./dod')
const stats = require('./stats')

module.exports = {
  run: function(room){
    health.run(room) //make a creep if necessary
    labour.run(room) //perform tasks for each creep
    dod.run(room) //defend and maintain room
    stats.run(room) //track and report empire data
  }
}