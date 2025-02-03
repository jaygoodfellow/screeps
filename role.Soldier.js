module.exports = {
  run: function(creep) {

    if(creep.room.name != creep.memory.room){
      creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.room)), { maxRooms: 1, reusePath: 5 })
    } else {
      if (creep.memory.position && creep.hits == creep.hitsMax) {
        creep.moveTo(creep.memory.position[0], creep.memory.position[1])
        return
      }
    const targets = Game.rooms[creep.memory.room].find(
        FIND_HOSTILE_CREEPS
      );
      let hostiles = [];
      
      for (let i in targets) {
        let bodyCount = _.countBy(targets[i].body, "type");
        hostiles.push({
          id: targets[i].id,
          healer: typeof bodyCount.heal == "undefined" ? 0 : 1,
          strength: typeof bodyCount.heal == "undefined" ? 0 : bodyCount.heal
        });
      }

      let sortedHostiles = _.sortByOrder(
        hostiles,
        ["healer", "strength"],
        ["desc", "desc"]
      );
      if (sortedHostiles.length > 0) {
        const target = Game.getObjectById(sortedHostiles[0].id);
        
        let outcome = null;
        if (creep.memory.role == "Ranged") outcome = creep.rangedAttack(target);
        if (creep.memory.role == "Melee") outcome = creep.attack(target);

        // console.log(creep.memory.role, outcome);
        if (outcome == ERR_NOT_IN_RANGE) creep.moveTo(target, { maxRooms: 1, reusePath: 5 });
      } else {
        // const target = Game.getObjectById('677fc4e072e90100290918b7');
        // const outcome = creep.rangedAttack(target);
        // console.log(outcome)
        // creep.moveTo(17,16)
      }
    }  
  }
};

