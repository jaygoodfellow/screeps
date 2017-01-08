'use strict'
const HelperFunctions = require('HelperFunctions')
const Cache = require('Cache')
const Mem = require('Memory')

function Creep() {
	this.cache = new Cache()
	this.memory = new Mem()
}

Creep.prototype.new = function(creepType, spawn) {
}

Creep.prototype.load = function(creep) {
	let job = this.memory.get(creep, 'job')
	if(!job) {
		job = this.getJob(creep)
		this.memory.set(creep, 'job', job)
		this.memory.set(creep, 'jobStage', 0)
	}
	let loadedCreep = {init: function(){}}
	loadedCreep.init()
	HelperFunctions.extend(loadedCreep, creep)
	return loadedCreep
}

Creep.prototype.remember = function(key, value) {
	if(value === undefined) return this.creep.memory[key]
	this.creep.memory[key] = value
	return value
}

Creep.prototype.forget = function(key) {
	delete this.creep.memory[key]
}

Creep.prototype.getJob = function(creep) {
		return creep.name.split('_')[0]
}
Creep.prototype.employment = function(creep) {

}


module.exports = Creep
