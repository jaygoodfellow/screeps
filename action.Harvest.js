module.exports = {
  run: function(creep) {
    let defaultSource = Game.getObjectById(creep.memory.energySource);
    const range = creep.pos.getRangeTo(defaultSource);
    if(creep.memory.pickup) {
    // const altSource = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 25);
      
    // if (altSource.length > 0) {
    //   if (creep.pickup(altSource[0]) == ERR_NOT_IN_RANGE) {
    //     creep.moveTo(altSource[0], { reusePath: 10 });
    //   }
    //   return;
    // }  
  }

    let desirableSource = creep.pos.findInRange(FIND_STRUCTURES, range, {
      filter: function(structure) {
        if (
          structure.structureType == STRUCTURE_CONTAINER &&
          _.sum(structure.store) >= 50
        )
          return true;

        if (
          structure.structureType == STRUCTURE_STORAGE &&
          structure.energy >= 500
        )
          return true;

        return false;
      }
    });
    if(!desirableSource && creep.memory.backupSource) {
      console.log(`Main source of ${creep.name} is empty, using backup source`);
      desirableSource = [Game.getObjectById(creep.memory.backupSource)];
    }

    let source = defaultSource;
    if (!creep.memory.role.startsWith("Harvester") && desirableSource.length) {
      source = desirableSource[0];
    }
    // return

    if(!source) {
      console.log(`No source for ${creep.name}`);
      return
    }
    if (typeof source.structureType != "undefined") {
      if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { reusePath: 5 });
      }
    } else {
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { reusePath: 5 });
      }
    }
  }
};
