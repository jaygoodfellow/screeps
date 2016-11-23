module.exports = {
    run:  function(workForce) {
      let spawn1 = Game.spawns['HQ']
      if(spawn1.canCreateCreep){
        let spawnName = 'Spawn_' + Game.time

  			if (workForce.Harvester < 2) {
  				spawn1.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Harvester', 'energySource': '57ef9d5d86f108ae6e60da45'})
        } else if (workForce.Fixer < 2) {
          spawn1.createCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Fixer', 'energySource': '57ef9d5d86f108ae6e60da44'})
        } else if(workForce.Upgrader < 5) {
          spawn1.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Upgrader', 'energySource': '57ef9d5d86f108ae6e60da44'})
        } else if (workForce.Builder < 3 && !_.isEmpty(Game.constructionSites)) {
          spawn1.createCreep([WORK,WORK,WORK,MOVE,MOVE,CARRY,CARRY,CARRY], spawnName, {'role':'Builder', 'energySource': '57ef9d5d86f108ae6e60da45'})
        }
      }
    }
};