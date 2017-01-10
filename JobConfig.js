module.exports = {
	"W57S74":
	{
		"upgradeController": {
			workers: 4,
			steps: [
				{target: "5836b7328b8b9619519effe3", action: "harvest"},
				{target: "5836b7328b8b9619519effe2", action: "upgradeController" }
			]
		},
		"builders": {
			workers: 1,
			steps: [
				{target: "5836b7328b8b9619519effe3", action: "harvest"},
				{target: null, action: "build", structureType: "constructionSite"}
			]
		},
		"transfers": {
			workers: 0,
			steps: [
				{target: "5836b7328b8b9619519effe3", action: "harvest"},
				{target: "587337bfc4e3b2ba3dafa29a", action: "transfer", type: "energy"}
			]
		}
	},
	"W57S75":
	{
		"upgradeController": {
			workers: 0,
			steps: [
				{target: "5836b7328b8b9619519effe5", action: "harvest"},
				{target: "5836b7328b8b9619519effe6", action: "upgradeController" }
			]
		},
		"transfer": {
			workers: 0,
			body: {
				parts: ["work","work","move","carry","move","carry"],
				scalar: 1
			},
			steps: [
				{target: "5836b7328b8b9619519effe5", action: "harvest"},
				{target: "586d12cd00257e047d1abb03", action: "transfer", type: 'energy'}
			]
		},
		"build": {
			workers: 2,
			body: {
				parts: ["work","work","work","work","work","move","carry","carry"],
				scalar: 1
			},
			steps: [
				{target: "5836b7328b8b9619519effe5", action: "harvest"},
				{target: '5873e08025890532550c5951', action: "build"}
			]
		},
		"buildSouth": {
			workers: 2,
			steps: [
				{target: "58739140b129cad116150d42", action: "withdraw", type: 'energy'},
				{target: null, action: "build", structureType: "constructionSite"}
			]
		},
		"extensions": {
			workers: 1,
			body: {
				parts: ["move","carry","move","carry"],
				scalar: 1
			},
			steps: [
				{target: "58739140b129cad116150d42", action: "withdraw", type: 'energy'},
				{target: null, action: "transfer", structureType: "extension", type: 'energy'}
			]
		},
		"extWithdraw": {
			workers: 1,
			body: {
				parts: ["work","work","work","work","move","move"],
				scalar: 1
			},
			pos: {x:24, y:45},
			steps: [
				{target: "5836b7328b8b9619519effe7", action: "harvest"},
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