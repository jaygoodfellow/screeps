module.exports = {
    run:  function(workForce) {
      let spawn = Game.spawns['HQ']
      if(spawn.canCreateCreep){
        let spawnName = 'Spawn_' + Game.time
  			if (workForce.Harvester < 3) {
  				spawn.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Harvester', 'room':spawn.room, 'energySource': '57ef9d5d86f108ae6e60da45'})
        } else if (workForce.Claimer < 1) {
          spawn.createCreep([MOVE,MOVE,CLAIM,CLAIM], spawnName, {'role':'Claimer', 'room':'W27N68'})
        } else if(workForce.Upgrader < 4) {
          spawn.createCreep([WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Upgrader', 'room':spawn.room, 'energySource': '57ef9d5d86f108ae6e60da44'})
        } else if (workForce.Builder < 1 && !_.isEmpty(Game.constructionSites)) {
          spawn.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Builder', 'room':spawn.room, 'energySource': '5835d51f22c10df7453a0a6a'})
        } else if (workForce.Mover < 1) {
          spawn.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Mover', 'room':spawn.room, 'energySource': '57ef9d5d86f108ae6e60da44'})
        } else if (workForce.Longhauler < 5) {
          spawn.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Longhauler', 'room':'W27N66'})
        } else if (workForce.Fixer < 1) {
          spawn.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], spawnName, {'role':'Fixer', 'room':spawn.room, 'energySource': '5835d51f22c10df7453a0a6a'})
        } else if (workForce.Soldier < 0) {
          spawn.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], spawnName, {'role':'Soldier', 'room':spawn.room})
        }
      }
    }
};