module.exports = {
  addSite: function(room, type, pos) {
    var terrain = pos.lookFor(LOOK_TERRAIN)
    if(terrain == 'swamp') {
      var struct = pos.lookFor(LOOK_STRUCTURES)
      if(struct.length == 0) pos.createConstructionSite(type)
    }
  },

  findRepair: function(creep) {
    const priority = [STRUCTURE_CONTAINER, STRUCTURE_WALL,  STRUCTURE_RAMPART, STRUCTURE_ROAD]
    let r = creep.room
    var finalSites = []
    let sites = (r.memory.structures.road || []).concat(r.memory.structures.constructedWall).concat(r.memory.structures.rampart).concat(r.memory.structures.container)
    for(let i in sites) {
      let site = Game.getObjectById(sites[i])
      if(site  && r.memory.tasks.indexOf(site.id) == -1 ) {
        site.adjustedMax = site.hitsMax
        if(site.structureType == 'constructedWall') site.adjustedMax = site.hitsMax/3000
        if(site.structureType == 'rampart') site.adjustedMax = site.hitsMax/3
        site.distance = Math.abs(Math.sqrt(Math.pow(creep.pos.x - site.pos.x, 2) + Math.pow(creep.pos.y - site.pos.y, 2)))
        site.priority = priority.indexOf(site.structureType)
        site.percent = parseFloat((site.hits/site.adjustedMax*100).toFixed(5))

        if(site.percent < 100)  finalSites.push(site)
      }
    }

    let sortedSites = _.sortByOrder(finalSites, ['percent', 'distance'], ['asc', 'asc'])
//console.log(JSON.stringify(sortedSites))
    return (sortedSites.length > 0) ? sortedSites[0].id : null

  },
  findBuild: function(creep) {
      const priority = [STRUCTURE_SPAWN, STRUCTURE_STORAGE, STRUCTURE_WALL, STRUCTURE_EXTENSION,  STRUCTURE_TOWER, STRUCTURE_CONTAINER]
      let r = creep.room

      var finalSites = []
      let sites = r.memory.constructionSites
      for(let i in sites) {
        let site = Game.getObjectById(sites[i])
        if(site) {
          site.distance = Math.abs(Math.sqrt(Math.pow(creep.pos.x - site.pos.x, 2) + Math.pow(creep.pos.y - site.pos.y, 2)))
          site.priority = priority.indexOf(site.structureType)
          site.percent = (site.progress/site.progressTotal*100).toFixed(0)
          finalSites.push(site)
        }
      }
      let sortedSites = _.sortByOrder(finalSites, ['distance'], ['asc'])
      //console.log(JSON.stringify(sortedSites))
      return (sortedSites.length > 0) ? sortedSites[0].id : null

  },
  findHarvest: function(creep) {

  },
  findTransfer: function(creep) {
    const priority = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER, STRUCTURE_STORAGE, STRUCTURE_CONTAINER]
    let finalSites = []

    let possibleSites = (Memory.rooms[creep.room.name].structures.spawn || []).concat(Memory.rooms[creep.room.name].structures.extension || []).concat(Memory.rooms[creep.room.name].structures.tower || [])

    for(let i of possibleSites) {
      let item = Game.getObjectById(i)

      if(item != null) {

        if(
            (item.structureType == STRUCTURE_EXTENSION && item.energy < 50 ) ||
            //(item.structureType == STRUCTURE_SPAWN && item.energy < 300) ||
            //(item.structureType == STRUCTURE_TOWER && item.energy < 1000) ||
            (item.structureType == STRUCTURE_CONTAINER && _.sum(item.store) < 2000) ||
            (item.structureType == STRUCTURE_STORAGE && _.sum(item.store) < 1000000)
        ) {
          finalSites.push({
          site: i,
          priority: priority.indexOf(item.structureType),
          distance: Math.abs(Math.sqrt(Math.pow(creep.pos.x - item.pos.x, 2) + Math.pow(creep.pos.y - item.pos.y, 2)))
          })
        }
      }
    }
    let sortedSites = _.sortByOrder(finalSites, ['priority',  'distance'], ['asc',  'asc'])
    return (sortedSites.length > 0) ? sortedSites[0].site : null

  }
}