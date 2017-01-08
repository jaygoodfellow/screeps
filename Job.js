'use strict'
const HelperFunctions = require('HelperFunctions')
const Cache = require('Cache')
const Mem = require('Memory')
const JobData = require('JobData')

function Job() {
	this.cache = new Cache()
	this.memory = new Mem()
}

Job.prototype.perform = function(creep, room) {

	this.employment(creep, room)

	let jobStage = this.memory.get(creep, 'jobStage') || 0
	let tasks = this.memory.get(creep, 'tasks')

	if( _.isEmpty(tasks) || typeof tasks.steps == 'undefined') return false

	let task = tasks.steps[jobStage]

	let nextStage = ++jobStage
	if(nextStage >= tasks.steps.length) nextStage = 0

	if(task.target == null) task.target = this.findTarget(creep)

	let result = this.act(creep, task)

	if(!result) {
		this.memory.forget(creep, 'tasks')
		this.memory.forget(creep, 'job')
	} else {
		switch (Game.getObjectById(task.target).structureType) {
			case 'source':
				if (_.sum(creep.carry) == creep.carryCapacity) this.memory.set(creep, 'jobStage', nextStage)
				break
			case 'controller':
			case 'spawn':
			case 'extension':
				if (_.sum(creep.carry) == 0) this.memory.set(creep, 'jobStage', nextStage)
				break
			default:
				if (_.sum(creep.carry) == 0) this.memory.set(creep, 'jobStage', nextStage)
				break
		}
	}
	return true
}

Job.prototype.employment = function(creep, room) {
	let tasks = this.memory.get(creep, 'tasks')
	if(_.isEmpty(tasks)) {
		tasks = this.tasks(creep, room)
		this.memory.set(creep, 'tasks', tasks)
		this.memory.set(creep, 'jobStage', 0)
	}
	return tasks
}

Job.prototype.tasks = function(creep, room) {
	let jobData = new JobData()
	return jobData.get(creep)
}

Job.prototype.act = function(creep, task) {
	let result = null

	const target = Game.getObjectById(task.target)
	if(target == null) return false

	const room = (typeof task.room != 'undefined') ? task.room : target.room.name
	let coords = {x: target.pos.x, y: target.pos.y}
	let bullseye = false
	if (typeof task.pos != 'undefined') {
		coords = task.pos
		bullseye = true
	}

	const targetPos = new RoomPosition(coords.x, coords.y, room)
	const creepPos =  new RoomPosition(creep.pos.x, creep.pos.y, creep.room.name)
	if(bullseye == true) {
		if(JSON.stringify(targetPos) == JSON.stringify(creepPos)) {
			result = creep[task.action](target, task.type)
		} else {
			creep.moveTo(targetPos, {reusePath: 10} )
		}
	} else {
		result = creep[task.action](target, task.type)

		switch (result) {
      case ERR_NOT_IN_RANGE:
        creep.moveTo(targetPos, {reusePath: 10} )
        break
			case ERR_NOT_ENOUGH_RESOURCES:
        this.memory.set(creep, 'jobStage', 0)
        break
			case ERR_INVALID_TARGET:
      case ERR_FULL:
      case ERR_NO_PATH:
				return false
				break
		}
	}


	return true
}

Job.prototype.findTarget = function(creep) {
	return '5871c106f40a21661a143f6a'
}
module.exports = Job