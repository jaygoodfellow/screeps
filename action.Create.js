const configRooms = require("config.Rooms");

const baseParts = {
  Mover: [WORK, WORK, MOVE, CARRY],
  Mover2: [WORK, WORK, MOVE, CARRY],
  Hauler: [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
  General: [WORK, WORK, CARRY, MOVE],
  Fixer: [WORK, WORK, CARRY, MOVE],
  Upgrader: [WORK, WORK, CARRY, MOVE],
  Builder: [WORK, WORK, CARRY, MOVE],
  Harvester: [WORK, CARRY, CARRY, MOVE],
  Claimer: [MOVE, MOVE, CLAIM],
  Soldier: [MOVE, ATTACK, ATTACK,TOUGH,TOUGH,TOUGH,TOUGH],
  Melee: [MOVE, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH],
  Ranged: [
    TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, 
    MOVE, MOVE, MOVE, MOVE, 
    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
    HEAL
  ],
  Miner: [WORK, WORK, WORK, CARRY,  MOVE],
  Explorer: [
    TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,  
    TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,   
    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,  
    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
    HEAL, HEAL, HEAL, HEAL, HEAL, HEAL  
  ]
};

const baseCost = Object.keys(baseParts).reduce((acc, key) => {
  acc[key] = _.sum(baseParts[key], b => BODYPART_COST[b])
  return acc
}, {})
// console.log(baseParts['Hauler'].length, JSON.stringify(baseCost['Hauler']))
const spawnLookup = {
  'E23N2': 'HQ1',
  'E23N3': 'HQ2',
  'E22N3': 'HQ3',
  'E24N3': 'HQ4',
}
const roomAlias = {
  "E24N3": "E23N3",
}
module.exports = {
  run: function(workForce) {
    for (let room in configRooms) {

      let roles = configRooms[room];
      let r = Game.rooms[room];

      if (!r) r = Game.rooms[roomAlias[room]]  

      let spawnRoom = roomAlias[room] ? Game.rooms[roomAlias[room]] : Game.rooms[room]

      
      if (!workForce[r.name]) workForce[r.name] = {};
   
      _.each(roles, role => {
        if (
          workForce[r.name][role.name] < role.max ||
          (!workForce[r.name].hasOwnProperty(role.name) && role.max > 0)
        ) {
          let totalParts = [];
          let roleType = "";
          switch (role.name) {
            case "Claimer":
              roleType = "Claimer";
              break;
            case "Explorer":
              roleType = "Explorer";
              break;
            case "General":
              roleType = "General";
              break;
            case "Soldier":
            case "Melee":
              roleType = "Soldier";
              break;
            case "Ranged":
              roleType = "Ranged";
              break;
            case "Mover":
              roleType = "Mover";
              break;
            case "Hauler":
              roleType = "Hauler";
              break;
            case "Upgrader":
              roleType = "Upgrader";
              break;
            case "Mover":
            case "Mover2":
            case "Mover3":
              roleType = "Mover";
              break;
            case "Builder":
              roleType = "Builder";
              break;
            case "Harvester":
              roleType = "Harvester";
              baseParts[roleType] = role.baseParts ? role.baseParts : baseParts[roleType];
              break;
            case "Miner":
              roleType = "Miner";
              break;              
            default:
              roleType = "Harvester";
              break;
          }
          

          if(roleType == 'Builder' ) {

            const sites = r.find(FIND_CONSTRUCTION_SITES)
            
            if(!sites.length) {
              // console.log(r.name, 'Cant make a builder, no construction sites')
              return false
            }
          }
          
          if (role.spawn) spawnRoom = Game.spawns[role.spawn].room;

          let scalar = Math.floor(
            spawnRoom.energyCapacityAvailable / baseCost[roleType]
          );
          
          if(roleType.scalarMin && scalar < roleType.scalarMin) {
            console.log('scalarMin', roleType, scalar, roleType.scalarMin)
            return
          }
      
          if (spawnRoom.energyAvailable < baseCost[roleType]) return;

          let availableScalar = Math.floor(
            spawnRoom.energyAvailable / baseCost[roleType]
          );
          if( roleType == 'Claimer') scalar = 1


          if(_.sum(workForce[r.name]) < 1) scalar = 1;


          if (roleType == 'Harvester' && workForce[r.name][roleType] == 0)  scalar = availableScalar > 3 ? 3 : availableScalar

          if(scalar > 6) scalar = 6
          if(role.scalarMax && scalar > role.scalarMax) scalar = role.scalarMax

          if( scalar == 0) return
          for (let i = 1; i <= scalar; i++) {
            totalParts = totalParts.concat(baseParts[roleType]);
          }
          // console.log(spawnRoom, room, roleType, scalar, baseCost[roleType], spawnRoom.energyCapacityAvailable)
          // if (role.name == 'Explorer') totalParts = totalParts.concat([WORK, CARRY])

          let spawnName = r.name + "_" + role.name + "_" + Game.time;
          const whichSpawn = role.spawn ? role.spawn : spawnLookup[room]
     
          const spawnBase = Game.spawns[whichSpawn];

          if (
            typeof spawnBase != "undefined" &&
            !spawnBase.spawning &&
            spawnRoom.energyAvailable >= baseCost[roleType] * scalar
          ) {
        
            let result = spawnBase.spawnCreep(totalParts, spawnName, {
              memory: {
                role: role.name,
                room: role.room ? role.room : r.name,
                energySource: role.energySource,
                energyTarget: role.energyTarget ? role.energyTarget : null,
                resource: role.resource ? role.resource : null,
                pickup: role.pickup ? role.pickup : false,
                position: role.position ? role.position : null
              }
            });
            console.log(
              totalParts.length,
              spawnRoom.name,
              result,
              role.name,
              baseCost[roleType] * scalar,
              spawnRoom.energyAvailable,
              scalar,
              JSON.stringify(totalParts)
            );
            return false;
          } else {
            // console.log('failed', role.name, room, Game.rooms[room].energyAvailable, baseCost[roleType], scalar)
          }
        }
      });
    }
  },
  recruit: function(room, type) {
    let spawnName = "Spawn_" + type + "_" + Game.time;
    const spawnBase = Game.spawns["E24N11"];
    let result = spawnBase.createCreep([RANGED_ATTACK, MOVE], spawnName, {
      role: type,
      room: room
    });
    // console.log(room.name, result, room.energyAvailable, type);
    return false;
  }
};
