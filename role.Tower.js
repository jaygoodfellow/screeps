
module.exports = {
    run: function(room){
      if(!room) return
      var towers = room.find(FIND_MY_STRUCTURES, {
          filter: { structureType: STRUCTURE_TOWER }
      })
      
      _.each(towers, tower => {
        var targets = tower.pos.findInRange(FIND_HOSTILE_CREEPS,50)
        if(targets.length > 0) {
          tower.attack(targets[0])
          return
        }
    
        
        let targetRepair = null;
     
        if (!targetRepair) {
          let t = tower.pos.findInRange(FIND_STRUCTURES, 100, {
            filter: function (item) {
              if (item.structureType == STRUCTURE_RAMPART) {
                let minHits = Memory.rooms[tower.room.name].minRampart || 100
                if (item.hits < minHits) return true
              }

              return false
            }, sort: (a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax
          })
          targetRepair = t.length ? _.sample(t) : null
          // if(targetRepair) console.log('rampart', targetRepair.hits )
        }

        if (!targetRepair) {
          let t = tower.pos.findInRange(FIND_STRUCTURES, 100, {
            filter: function (item) {
              if (item.structureType == STRUCTURE_WALL) {
                let minHits = Memory.rooms[tower.room.name].minWall || 100
                if (item.hits < minHits) return true
              }

              return false
            }, sort: (a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax
          })
          targetRepair = t.length ? _.sample(t) : null
          // if(targetRepair) console.log('wall', targetRepair.hits )
        }



        if (!targetRepair) {
          let t = tower.pos.findInRange(FIND_STRUCTURES, 100, {
            filter: function (item) {
              if (item.structureType == STRUCTURE_ROAD && item.hits / item.hitsMax < 0.9) return true

              return false
            }, sort: (a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax
          })
          targetRepair = t.length ? t[0] : null
        }

        if (!targetRepair) {
          let t = tower.pos.findInRange(FIND_STRUCTURES, 100, {
            filter: function (item) {
              if (
                (item.structureType == STRUCTURE_STORAGE && item.hits / item.hitsMax < 0.85) ||
                (item.structureType == STRUCTURE_CONTAINER && item.hits / item.hitsMax < 0.85)
              ) return true

              return false
            }, sort: (a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax
          })
          targetRepair = t.length ? t[0] : null
        }
        if (targetRepair && tower.energy / tower.energyCapacity > 0.0) {
          tower.repair(targetRepair)
        }
      })
  }
}