module.exports = {
  addSite: function(room, type, pos) {
    var terrain = pos.lookFor(LOOK_TERRAIN)
    if(terrain == 'swamp') {
      var struct = pos.lookFor(LOOK_STRUCTURES)
      if(struct.length == 0) pos.createConstructionSite(type)
    }
  },
  findRepair: function(creep) {
    const priority = [STRUCTURE_CONTAINER,STRUCTURE_RAMPART,STRUCTURE_WALL,STRUCTURE_ROAD]
    let r = creep.room

    var finalSites = []
    let sites = r.memory.roads.concat(r.memory.walls).concat(r.memory.ramparts)
    let max = 300000000
    for(let i in sites) {
      let site = Game.getObjectById(sites[i])
      if(site) {
        site.distance = Math.abs(Math.sqrt(Math.pow(creep.pos.x - site.pos.x, 2) + Math.pow(creep.pos.y - site.pos.y, 2)))
        site.priority = priority.indexOf(site.structureType)
        finalSites.push(site)
        site.percent = (site.hits / max) / (site.hitsMax / max)
      }
    }
    let sortedSites = _.sortByOrder(finalSites, ['priority', 'percent', 'distance'], ['desc', 'asc', 'asc'])
    console.log(JSON.stringify(sortedSites[0]))
    return (sortedSites.length > 0) ? sortedSites[0].id : null

  },
  findBuild: function(creep) {
      const priority = [STRUCTURE_SPAWN,STRUCTURE_EXTENSION,STRUCTURE_STORAGE,STRUCTURE_TOWER,STRUCTURE_CONTAINER,STRUCTURE_WALL]
      let r = creep.room

      var finalSites = []
      let sites = r.memory.constructionSites
      for(let i in sites) {
        let site = Game.getObjectById(sites[i])
        if(site) {
          sites[i].distance = Math.abs(Math.sqrt(Math.pow(creep.pos.x - site.pos.x, 2) + Math.pow(creep.pos.y - site.pos.y, 2)))
          sites[i].priority = priority.indexOf(site.structureType)
          finalSites.push(site)
        }
      }
      let sortedSites = _.sortByOrder(finalSites, ['priority', 'percent', 'distance'], ['desc', 'asc', 'asc'])
      return (sortedSites.length > 0) ? sortedSites[0].id : null

  },
  findTransfer: function(creep) {
    let finalSites = []
    let possibleSites = creep.room.memory.spawns.concat(creep.room.memory.extensions)
    for(let i of possibleSites) {
      let item = Game.getObjectById(i)
      if((item.structureType == 'extension' && item.energy < 50) || (item.structureType == 'spawn' && item.energy < 300) ) {
        finalSites.push({
        'site': i,
        distance: Math.abs(Math.sqrt(Math.pow(creep.pos.x - item.pos.x, 2) + Math.pow(creep.pos.y - item.pos.y, 2)))
        })
      }
    }
    let sortedSites = _.sortByOrder(finalSites, 'distance', 'asc')

    return (sortedSites.length > 0) ? sortedSites[0].site : null

  }
}