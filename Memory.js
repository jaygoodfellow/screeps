'use strict'

function Memory() {
	this._data = {}
}

Memory.prototype.get = function(object, key) {
	let data = Game.getObjectById(object.id).memory[key]
	return (typeof data != 'undefined') ? data : false
}

Memory.prototype.set = function(object, key, value) {
	Game.getObjectById(object.id).memory[key] = value
	return 	Game.getObjectById(object.id).memory[key]
}

Memory.prototype.forget = function(object, key) {
	delete Game.getObjectById(object.id).memory[key]
	return true
}

module.exports = Memory
