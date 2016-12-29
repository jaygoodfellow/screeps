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
      max: 0,
      spawn: 'HQ2',
      parts: workerParts,
    }
  ],
  'W27N67' : [
    // {
    //   name: 'Claimer',
    //   max: 1,
    //   spawn: 'HQ',
    //   parts: [MOVE,CLAIM]
    // },
    // {
    //   name: 'Soldier',
    //   max: 1,
    //   spawn: 'HQ',
    //   parts: [MOVE, ATTACK],
    // },
    {
      name: 'Harvester',
      max: 3,
      spawn: 'HQ',
      parts: workerParts,
      energySource: '57ef9d5d86f108ae6e60da45'
    },
    {
      name: 'Upgrader2',
      max: 3,
      spawn: 'HQ',
      parts: workerParts,
      energySource: '5835d51f22c10df7453a0a6a'
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
      max: 1,
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
    }
    ],
    'W26N67' : [
      {
        name: 'Builder',
        max: 2,
        spawn: 'HQ3',
        parts: workerParts,
        energySource: '57ef9d6086f108ae6e60da86'
      },
      {
        name: 'Upgrader',
        max: 3,
        spawn: 'HQ3',
        parts: workerParts,
        energySource: '57ef9d6086f108ae6e60da85'
      },
      {
        name: 'Harvester',
        max: 1,
        spawn: 'HQ3',
        parts: workerParts,
        energySource: '57ef9d6086f108ae6e60da86'
      }
      ]

}