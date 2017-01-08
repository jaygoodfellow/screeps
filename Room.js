'use strict'
const Cache = require('Cache')
const Creep = require('Creep')
const Structure = require('Structure')
var Constructions = require('Constructions')

function Room(room) {
	this.cache = new Cache()
	this.room = Game.rooms[room]
	this.creeps = []
	this.structures = []
	this.sources = []
	this.loadCreeps()
	this.loadStructures()

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
	const structures = this.room.lookForAtArea(LOOK_STRUCTURES, 0, 0, 50, 50, true)
	let structure = new Structure()
	for(let i in structures) {
		const s = structure.load(structures[i].structure)
		s.underConstruction = false
		if(s) this.structures.push(s)
	}

	const sources = this.room.lookForAtArea(LOOK_SOURCES, 0, 0, 50, 50, true)
	for(let i in sources) {
		let source = sources[i].source
		source.owner = this.room.controller.owner
		source.structureType = 'source'
		source.underConstruction = false
		this.structures.push(source)
	}

	const sites = this.room.lookForAtArea(LOOK_CONSTRUCTION_SITES, 0, 0, 50, 50, true)
	for(let i in sites) {
		let site = sites[i].constructionSite
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
Room.prototype.getStructures = function(){
	return this.structures
}

module.exports = Room
