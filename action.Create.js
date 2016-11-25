module.exports = {
    run:  function(workForce) {
      let spawn1 = Game.spawns['HQ']
      if(spawn1.canCreateCreep){
        let spawnName = 'Spawn_' + Game.time
  			if (workForce.Harvester < 2) {
  				//spawn1.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Harvester', 'room':'W27N67', 'energySource': '57ef9d5d86f108ae6e60da45'})
          spawn1.createCreep([WORK,MOVE,MOVE,CARRY,CARRY], spawnName, {'role':'Harvester', 'room':'W27N67', 'energySource': '57ef9d5d86f108ae6e60da45'})
        } else if (workForce.Soldier < 0) {
          spawn1.createCreep([MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK], spawnName, {'role':'Soldier', 'room':'W27N67'})
        // } else if (workForce.Fixer < 1) {
        //   spawn1.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Fixer', 'room':'W27N67', 'energySource': '57ef9d5d86f108ae6e60da44'})
        } else if(workForce.Upgrader < 4) {
          spawn1.createCreep([WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Upgrader', 'room':'W27N67', 'energySource': '57ef9d5d86f108ae6e60da44'})
        } else if (workForce.Builder < 1 && !_.isEmpty(Game.constructionSites)) {
          spawn1.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Builder', 'room':'W27N67', 'energySource': '57ef9d5d86f108ae6e60da44'})
        } else if (workForce.Longhauler < 6) {
          spawn1.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Longhauler', 'room':'W27N66'})
        }
      }
    }
};