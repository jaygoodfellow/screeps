const workerParts = [WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY]
module.exports = {
  'W27N68' : [
    {
      name: 'Harvester',
      max: 3,
      spawn: 'HQ2',
      parts: workerParts,
      energySource: '57ef9d5d86f108ae6e60da41'
    },
    {
      name: 'Harvester2',
      max: 2,
      spawn: 'HQ2',
      parts: workerParts,
      energySource: '57ef9d5d86f108ae6e60da42'
    },
    {
      name: 'Upgrader',
      max: 3,
      spawn: 'HQ2',
      parts: workerParts,
      energySource: '583f8e60d575dda40825619a'
    },
    {
      name: 'Mover',
      max: 1,
      spawn: 'HQ2',
      parts: workerParts,
      energySource: '583f8e60d575dda40825619a'
    },
    {
      name: 'Builder',
      max: 1,
      spawn: 'HQ2',
      parts: workerParts,
      energySource: '583f8e60d575dda40825619a'
    },
    {
      name: 'Fixer',
      max: 1,
      spawn: 'HQ2',
      parts: workerParts,
    }
  ],
  'W27N67' : [
    {
      name: 'Harvester',
      max: 3,
      spawn: 'HQ',
      parts: workerParts,
      energySource: '57ef9d5d86f108ae6e60da45'
    },
    {
      name: 'Upgrader',
      max: 3,
      spawn: 'HQ',
      parts: workerParts,
      energySource: '57ef9d5d86f108ae6e60da44'
    },
    {
      name: 'Builder',
      max: 0,
      spawn: 'HQ',
      parts: workerParts,
      energySource: '5835d51f22c10df7453a0a6a'
    },
    {
      name: 'Fixer',
      max: 2,
      spawn: 'HQ',
      parts: workerParts,
      energySource: '5835d51f22c10df7453a0a6a'
    },
    {
      name: 'Mover',
      max: 1,
      spawn: 'HQ',
      parts: workerParts,
      energySource: '57ef9d5d86f108ae6e60da44'
    },
    {
      name: 'Soldier',
      max: 0,
      spawn: 'HQ',
      parts: [MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
      room:'W28N67'
    }
    ]

}