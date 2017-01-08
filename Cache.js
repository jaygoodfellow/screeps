'use strict'

function Cache() {
	this._data = {}
}

Cache.prototype.get = function(key) {
	return this._data[key]
}
Cache.prototype.set = function(key, value) {
	this._data[key] = value
	return this._data[key]
}

module.exports = Cache
