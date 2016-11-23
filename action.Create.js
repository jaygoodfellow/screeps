module.exports = {
    run:  function(workForce) {
      let spawn1 = Game.spawns['HQ']
      if(spawn1.canCreateCreep){
        let spawnName = 'Spawn_' + Game.time

  			if (workForce.Harvester < 1) {
  				spawn1.createCreep([WORK,MOVE,MOVE,CARRY,CARRY], spawnName, {'role':'Harvester'})
        } else if(workForce.Miner < 1) {
          spawn1.createCreep([WORK,WORK,WORK,MOVE,MOVE], spawnName, {'role':'Miner'})
        } else if(workForce.Upgrader < 4) {
          spawn1.createCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY], spawnName, {'role':'Upgrader'})
        } else if (workForce.Builder < 3 && !_.isEmpty(Game.constructionSites)) {
          spawn1.createCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY], spawnName, {'role':'Builder', 'energySource': '57ef9d5d86f108ae6e60da45'})
        } else if (workForce.Fixer < 1) {
          spawn1.createCreep([WORK,MOVE,MOVE,CARRY,CARRY,CARRY], spawnName, {'role':'Fixer'})
        }
      }
    }
};