module.exports = {
    run:  function(creep) {
        let dropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES,3)

        if(dropped[0]) {
            if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped[0])
            }
        } else {
          let source = creep.pos.findClosestByRange(FIND_SOURCES)
          if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
              creep.moveTo(source)
          }
        }
    }
};