'use strict'
const HelperFunctions = require('HelperFunctions')
const Cache = require('Cache')
const Mem = require('Memory')

const Data = {
	'W57S75':
	{
		'upgradeController': {
			steps: [
				{target: '587143ab78e2a9770c721d7f', action: 'withdraw', type: RESOURCE_ENERGY},
				{target: '5836b7328b8b9619519effe6', action: 'upgradeController' },
			]
		},
		'transfer': {
			steps: [
				{target: '5836b7328b8b9619519effe5', action: 'harvest'},
				{target: '586d12cd00257e047d1abb03', action: 'transfer', type: RESOURCE_ENERGY }
			]
		},
		'build': {
			steps: [
				{target: '5836b7328b8b9619519effe5', action: 'harvest'},
				{target: null, action: 'build'}
			]
		}
	}
}

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

module.exports = JobData