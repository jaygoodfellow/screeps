module.exports = {
    run:  function(workForce) {
      let spawn1 = Game.spawns['HQ']
      if(spawn1.canCreateCreep){
        let spawnName = 'Spawn_' + Game.time

  			if (workForce.Harvester < 1) {
  				spawn1.createCreep([WORK,MOVE,MOVE,CARRY,CARRY], spawnName, {'role':'Harvester'})
        } else if(workForce.Upgrader < 3) {
          spawn1.createCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY], spawnName, {'role':'Upgrader'})
        } else if (workForce.Builder < 2 && !_.isEmpty(Game.constructionSites)) {
          spawn1.createCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY], spawnName, {'role':'Builder'})
        } else if (workForce.Fixer < 2) {
          spawn1.createCreep([WORK,MOVE,MOVE,CARRY,CARRY,CARRY], spawnName, {'role':'Fixer'})
        }
      }
    }
};