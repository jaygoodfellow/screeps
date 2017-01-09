'use strict'
const Cache = require('Cache')
const Creep = require('Creep')
const Structure = require('Structure')
const Constructions = require('Constructions')
const JobData = require('JobData')
const Memory = require('Memory')

function Room(room) {
	this.cache = new Cache()
	this.room = Game.rooms[room]
	this.memory = new Memory()
	this.creeps = []
	this.structures = []
	this.sources = []
	this.loadCreeps()
	this.loadStructures()

}
Room.prototype.defend = function() {
	var hostiles = this.room.find(FIND_HOSTILE_CREEPS);

	if(hostiles.length > 0) {
			var username = hostiles[0].owner.username;
			Game.notify(`User ${username} spotted in room ${this.room.name}`);
			var towers = this.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
			towers.forEach(tower => tower.attack(hostiles[0]));
	}
}

Room.prototype.loadCreeps = function() {
	const creeps = this.room.find(FIND_MY_CREEPS)
	let creep = new Creep()
	for(let i in creeps) {
		const c = creep.load(creeps[i])
		if(c) this.creeps.push(c)
	}
}
Room.prototype.loadStructures = function(){
	const myStructures = this.room.lookForAtArea(LOOK_STRUCTURES, 0, 0, 50, 50, true)
	let structure = new Structure()
	for(let i in myStructures) {
		const s = structure.load(myStructures[i].structure)
		s.underConstruction = false
		if(s) this.structures.push(s)
	}

	const mySources = this.room.lookForAtArea(LOOK_SOURCES, 0, 0, 50, 50, true)
	for(let i in mySources) {
		let source = mySources[i].source
		source.owner = this.room.controller.owner
		source.structureType = 'source'
		source.underConstruction = false
		this.structures.push(source)
	}

	const mySites = this.room.lookForAtArea(LOOK_CONSTRUCTION_SITES, 0, 0, 50, 50, true)
	for(let i in mySites) {
		let site = mySites[i].constructionSite
		site.underConstruction = true
		this.structures.push(site)
	}

}
Room.prototype.getRoomData = function(room) {
		return {creeps: this.creeps, structures: this.structures}
}
Room.prototype.getCreeps = function(){
	return this.creeps
}
Room.prototype.getStructures = function(type){
	if(type == null) return this.structures
	let results = []

	for(let i in this.structures) {
		let structure = this.structures[i]

		if(structure.structureType == type && structure.underConstruction == false) results.push(structure)
	}
	return results
}
Room.prototype.findBuild = function(creep) {
	let results = []
	for(let i in this.structures) {
		let structure = this.structures[i]
		if(structure.underConstruction == true) {
			structure.distance = Math.abs(Math.sqrt(Math.pow(creep.pos.x - structure.pos.x, 2) + Math.pow(creep.pos.y - structure.pos.y, 2)))
			results.push(structure)
		}
	}
	let sortedSites = _.sortByOrder(results, ['distance'], ['asc'])
	return (sortedSites.length > 0) ? sortedSites[0].id : null
}

Room.prototype.findRepair = function(tower) {
	let results = []
	for(let i in this.structures) {
		let structure = this.structures[i]
		let percent = structure.hits/structure.hitsMax * 100
		if(percent && (structure.structureType == 'road' || structure.structureType == 'rampart' || structure.structureType == 'container')) structure.percent = percent
		results.push(structure)
	}

  let sortedSites = _.sortByOrder(results, ['percent'], ['asc'])
  return (sortedSites.length > 0) ? sortedSites[0].id : null
}

Room.prototype.findSpawnTower = function(creep) {
	const priority = [STRUCTURE_SPAWN, STRUCTURE_TOWER]
	let results = []

	let possibleSites = this.getStructures('spawn').concat(this.getStructures('tower'))
	for(let item of possibleSites) {
		if(
				(item.structureType == STRUCTURE_SPAWN && item.energy < 300) ||
				(item.structureType == STRUCTURE_TOWER && item.energy < 1000)
		) {
			results.push({
			site: item.id,
			priority: priority.indexOf(item.structureType),
			distance: Math.abs(Math.sqrt(Math.pow(creep.pos.x - item.pos.x, 2) + Math.pow(creep.pos.y - item.pos.y, 2)))
			})
		}

	}
	let sortedSites = _.sortByOrder(results, ['priority',  'distance'], ['asc',  'asc'])

	return (sortedSites.length > 0) ? sortedSites[0].site : null
}

Room.prototype.findExtension = function(creep) {
	let results = []

	let possibleSites = this.getStructures('extension')
	for(let item of possibleSites) {
		if(item.structureType == STRUCTURE_EXTENSION && item.energy < 50) {
			results.push({
			site: item.id,
			distance: Math.abs(Math.sqrt(Math.pow(creep.pos.x - item.pos.x, 2) + Math.pow(creep.pos.y - item.pos.y, 2)))
			})
		}
	}
	let sortedSites = _.sortByOrder(results, ['distance'], ['asc'])
	return (sortedSites.length > 0) ? sortedSites[0].site : null
}

Room.prototype.population = function() {
	let spawn = this.getStructures('spawn')[0]
	let data = new JobData()
	let req = data.getWorkerRequirements(this.room)
	let workers = {}
	for(let creep of this.creeps) {
		let job = this.memory.get(creep, 'job')
		req[job]--
	}

	for(let i in req) {
		if(parseInt(req[i]) > 0) {
			let parts = data.getBodyParts(this.room, i)
			let result = spawn.createCreep(parts, i+'_'+Game.time, {job: i, jobStage: 0, room: this.room.name})
			if(typeof result == 'string') console.log('new creep: ', result)
		}
	}

}
module.exports = Room
