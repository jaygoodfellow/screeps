module.exports = {
    run: function(creep) {
    if (_.sum(creep.carry) < creep.carryCapacity){
      // console.log('Hauler', creep.name, 'is looking for source')
      let source = Game.getObjectById(creep.memory.energySource)
      const res = creep.withdraw(source, creep.memory.resource)
      // console.log(creep, res)
      if (res == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { reusePath: 5 });
      }
    }
    if (_.sum(creep.carry) == creep.carryCapacity) {
      // console.log('Hauler', creep.name, 'is looking for a target')
      let target = Game.getObjectById(creep.memory.energyTarget)
      if (creep.transfer(target, creep.memory.resource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target,{reusePath: 5})
        }
    }

  }
}


      // const dropTarget = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 15).filter(r => r.resourceType == creep.memory.resource);
      
      // if (dropTarget.length) {
      //     if (creep.pickup(dropTarget) == ERR_NOT_IN_RANGE) {
      //         creep.moveTo(dropTarget);
      //     }
      //     return
      // }