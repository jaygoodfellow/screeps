module.exports = {
	"W57S75":
	{
		"upgradeController": {
			workers: 3,
			steps: [
				{target: "5836b7328b8b9619519effe5", action: "harvest"},
				{target: "5836b7328b8b9619519effe6", action: "upgradeController" }
			]
		},
		"controllerHelper": {
			workers: 0,
			body: {
				parts: ["work","work","move","carry","move","carry"],
				scalar: 1
			},
			steps: [
				{target: "5836b7328b8b9619519effe3", action: "harvest"},
				//{target: "5836b7328b8b9619519effe2", action: "upgradeController"}
				{target: "5872da82f40a21661a161887", action: "build"}
				//{target: null, action: "build", structureType: "constructionSite"}
			]
		},
		"transfer": {
			workers: 1,
			body: {
				parts: ["work","work","move","carry","move","carry"],
				scalar: 1
			},
			steps: [
				{target: "5836b7328b8b9619519effe5", action: "harvest"},
				{target: "586d12cd00257e047d1abb03", action: "transfer", type: 'energy'}
				//{target:  null, action: "transfer", type: "energy", structureType: "spawnTower"}
			]
		},
		"build": {
			workers: 1,
			steps: [
				{target: "5836b7328b8b9619519effe5", action: "harvest"},
				{target: null, action: "build", structureType: "constructionSite"}
			]
		},
		"buildSouth": {
			workers: 1,
			body: {
				parts: ["work","work","move","carry"],
				scalar: 1
			},
			steps: [
				{target: "5836b7328b8b9619519effe7", action: "harvest"},
				{target: null, action: "build", structureType: "constructionSite"}
			]
		},
		"buildNorth": {
			workers: 0,
			body: {
				parts: ["work","work","work","move","carry","move","carry","move","carry"],
				scalar: 1
			},
			steps: [
				{target: "5836b7328b8b9619519effe3", action: "harvest"},
				{target: null, action: "build", structureType: "constructionSite"}
			]
		},
		"extensions": {
			workers: 1,
			body: {
				parts: ["work","work","move","carry"],
				scalar: 1
			},
			steps: [
				{target: "5836b7328b8b9619519effe7", action: "harvest"},
				{target: null, action: "transfer", structureType: "extension", type: 'energy'}
			]
		},
		"soldier": {
			workers: 0,
			body: {
				parts: ["move","attack"],
				scalar: 1
			},
			steps: [
				{target: "583b372087df5625203bdb97", action: "attack"},
			]
		}
	}
}