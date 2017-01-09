'use strict'
const HelperFunctions = require('HelperFunctions')
const Cache = require('Cache')

let cache = new Cache()

function Structure() {

}
Structure.prototype.new = function(creepType, spawn) {

}

Structure.prototype.load = function(structure) {
	return structure
}

module.exports = Structure;
