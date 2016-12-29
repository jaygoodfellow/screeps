module.exports = {
  'Upgrader': {
    creeps: [],
    max: 2,
    parts: {'WORK': 1, 'MOVE': 2, 'CARRY': 2},
    source: Game.rooms[0],
    target: Game.rooms[0],
    module: 'role.Harvester',
    method: 'run',
    total: 0
  },
  'Fixer': {
  },
  'Builder': {
  },
  'Harvester': {
  },
  'Soldier': {
  },
  'Longhauler': {

  }

};