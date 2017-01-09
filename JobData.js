'use strict'
const HelperFunctions = require('HelperFunctions')
const Cache = require('Cache')
const Mem = require('Memory')
const Data = require('JobConfig')

function JobData() {
	this.cache = new Cache()
	this.memory = new Mem()
	this.data = Data
}

JobData.prototype.get = function(creep) {
	let room = this.memory.get(creep, 'room') || this.memory.get(creep, 'home') || creep.room.name
	let tasks = this.data[room][this.memory.get(creep, 'job')]
	return tasks
}

JobData.prototype.getWorkerRequirements = function(room) {
	let results = {}
	for(let i in this.data[room.name]) {
		results[i] = this.data[room.name][i].workers
	}

	return results
}
JobData.prototype.getBodyParts = function(room, job) {
	return (typeof this.data[room.name][job].body != 'undefined') ? this.data[room.name][job].body.parts : [WORK,MOVE,MOVE,CARRY,CARRY]
}
module.exports = JobData