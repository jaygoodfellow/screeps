
module.exports = {
    run: function(room, hostiles){
      hostiles.map(hostile => {
        console.log(JSON.stringify(hostile))
      })
      var username = hostiles[0].owner.username
      Game.notify(`User ${username} spotted in room ${room.name}`)
      var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}})
      towers.forEach(tower => tower.attack(hostiles[0]))
    }
}