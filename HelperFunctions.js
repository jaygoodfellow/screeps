var HelperFunctions = {}
HelperFunctions.extend = function(target, source) {
	//console.log(JSON.stringify(source))
	for(let i in source) {
		if(target.hasOwnProperty(i)) {
			continue
		}
		target[i] = source[i]
	}
}

HelperFunctions.garbageCollection = function() {
	for(let i in Memory.creeps) {
		const creep = Game.creeps[i]
		if(!creep) {
			delete Memory.creeps[i]
		}
	}
}

HelperFunctions.initMemory = function() {
	if(typeof Memory.rooms == 'undefined') Memory.rooms = {}
}
module.exports = HelperFunctions
