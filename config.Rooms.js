module.exports = {
  'E23N2': [
    {
      "name": "Harvester",
      "max": 1,
      // "scalarMax": 5,
      "energySource": "677b91e0beaa020053ebc572",
      "backupSource": "677972935e0ceb001d55beef",
    },
    {
      "name": "Miner",
      "max": 0,
      "scalarMax": 1,
      "energySource": "677972935e0ceb001d55beec",
      "energyTarget": "677b91e0beaa020053ebc572"
    },
    {
      "name": "Hauler",
      "max": 0,
      "scalarMax": 3,
      "energySource": "677b91e0beaa020053ebc572",
      "energyTarget": "677f73540acbc5004cee7ac2",
      "resource": "energy"
    },
    {
      "name": "Mover",
      "max": 1,
      "position": [12, 9],
      "energySource": "677972935e0ceb001d55beef",
      // "energyTarget": "677b91e0beaa020053ebc572"
    },
    {
      "name": "Mover2",
      "max": 1,
      "position": [16, 8],
      "energySource": "677972935e0ceb001d55beee",
      // "energyTarget": "677b91e0beaa020053ebc572"
    },
    {
      "name": "Upgrader",
      "max": 1,
      "scalarMax": 3,
      "energySource": "677b91e0beaa020053ebc572"
    },
    {
      "name": "Fixer",
      "max": 0,
      "scalarMax": 1,
      "energySource": "677b91e0beaa020053ebc572"
    },
    {
      "name": "Melee",
      "max": 0,
    },
    {
      "name": "Ranged",
      "max": 0,
    },
    {
      "name": "Claimer",
      "max": 0,
      "scalarMax": 1,
      "target": "677972935e0ceb001d55be2a",
    },
    {
      "name": "Explorer",
      "max": 0,
      "scalarMax": 1,
      "scalarMin": 1,
      "room": "E23N4",
      "energySource": "677972935e0ceb001d55bd61"
    },
    {
      "name": "Builder",
      "max": 1,
      "scalarMax": 8,
      "energySource": "677b91e0beaa020053ebc572",
      "room": "E23N2"
    },

  ],
  'E23N3': [
    {
      "name": "Harvester",
      "max": 1,
      // "scalarMax": 5,
      "pickup": false,
      "energySource": "67845eac571812003e04a369"
    },
    {
      "name": "Miner",
      "max": 0,
      "scalarMax": 5,
      "energySource": "677972935e0ceb001d55be2c",
      "energyTarget": "6788a3d926f8210044580036"
    },
    {
      "name": "Hauler",
      "max": 0,
      // "scalarMax": 5,
      "energySource": "6788a3d926f8210044580036",
      "energyTarget": "67845eac571812003e04a369",
      "resource": "energy"
    },
    {
      
      "name": "Mover",
      "max": 1,
      "position": [19, 41],
      "scalarMax": 4,
      "energySource": "677972935e0ceb001d55be2e",
      // "energyTarget": "67845eac571812003e04a369"

    },
    {
      "name": "Mover2",
      "max": 2,
      // "scalarMax": 5,
      "energySource": "677972935e0ceb001d55be2f",
      // "energyTarget": "67845eac571812003e04a369"
    },
    {
      "name": "Upgrader",
      "max": 2,
      "scalarMax": 5,
      "energySource": "67845eac571812003e04a369"
    },
    {
      "name": "Explorer",
      "max": 0,
      "scalarMax": 6,
      "scalarMin": 3,
      "room": "E24N4",
      "energySource": "677972935e0ceb001d55bd61"
    },
    {
      "name": "Fixer",
      "max": 0,
      "scalarMax": 1,
      "energySource": "67845eac571812003e04a369"
    },
    {
      "name": "Melee",
      "max": 0,
      "scalarMax": 1,
    },
    {
      "name": "Ranged",
      "max": 0,
    },
    {
      "name": "Claimer",
      "max": 0,
      "scalarMax": 1,
      "room": "E24N3",
      "target": "677972935e0ceb001d55be30",
    },
    {
      "name": "Builder",
      "max": 1,
      "energySource": "67845eac571812003e04a369",
      // "scalarMax": 3,
    },
 
  ],
  'E22N3': [
    {
      "name": "Harvester",
      "max": 1,
      "scalarMax": 4,
      "pickup": false,
      "energySource": "67896d03e62fbd00442aaf23"
    },
    {
      "name": "Miner",
      "max": 0,
      "energySource": "677972935e0ceb001d55be28",
      "energyTarget": "678db87ba1398a0069ffe687"
    },
    {
      "name": "Mover",
      "max": 1,
      "pickup": false,
      "energySource": "677972935e0ceb001d55be29",
      // "energyTarget": "67896d03e62fbd00442aaf23"
      
    },
    {
      "name": "Mover2",
      "max": 1,
      "energySource": "677972935e0ceb001d55be2b",
      // "energyTarget": "67896d03e62fbd00442aaf23"
    },
    {
      "name": "Hauler",
      "max": 0,
      // "scalarMax": 5,
      "energySource": "678db87ba1398a0069ffe687",
      "energyTarget": "67896d03e62fbd00442aaf23",
      "resource": "Z"
    },
    {
      "name": "Upgrader",
      "max": 1,
      "scalarMax": 8,
      "energySource": "67896d03e62fbd00442aaf23"
    },
    {
      "name": "Fixer",
      "max": 0,
      "scalarMax": 1,
      "energySource": "67896d03e62fbd00442aaf23"
    },
    {
      "name": "Melee",
      "max": 0,
      "scalarMax": 1,
    },
    {
      "name": "Ranged",
      "max": 0,
    },
    {
      "name": "Claimer",
      "max": 0,
      "scalarMax": 1,
    },
    {
      "name": "Builder",
      "max": 1,
      "pickup": false,
      "scalarMax": 8,
      "energySource": "67896d03e62fbd00442aaf23"
    },
    {
      "name": "Explorer",
      "max": 0,
      "scalarMax": 3,
      "room": "E22N22",
      "energySource": "677972935e0ceb001d55af8c"
    },

  ],
  'E24N3': [
    {
      "name": "Harvester",
      "max": 0,
      "scalarMax": 2,
      "energySource": "677972935e0ceb001d55be31",
    },
    {
      "name": "Miner",
      "max": 0,
      "room": "E24N3",
      "scalarMax": 4,
      "energySource": "677972935e0ceb001d55beec",
      "target": "677b91e0beaa020053ebc572"
    },
    {
      "name": "Mover",
      "max": 0,
      "position": [12, 9],
      "energySource": "677972935e0ceb001d55beef",
      "energyTarget": "677b91e0beaa020053ebc572"
    },
    {
      "name": "Mover2",
      "max": 0,
      "position": [16, 8],
      "energySource": "677972935e0ceb001d55beee",
      "energyTarget": "677b91e0beaa020053ebc572"
    },
    {
      "name": "Upgrader",
      "max": 0,
      "spawn": "HQ2",
      "room": "E24N3",
      "scalarMax": 5,
      "energySource": "677972935e0ceb001d55be31"
    },
    {
      "name": "Fixer",
      "max": 0,
      "scalarMax": 2,
      "room": "E24N3",
      "energySource": "677972935e0ceb001d55be31"
    },
    {
      "name": "Melee",
      "max": 0,
      "room": "E24N3"
    },
    {
      "name": "Ranged",
      "max": 0,
      "scalarMax": 1,
      "position": [25, 3],
      "spawn": "HQ2",
      "room": "E24N3"
    },
    {
      "name": "Claimer",
      "max": 0,
      "scalarMax": 1,
      "target": "677972935e0ceb001d55be2a",
      "room": "E24N3"
    },
    {
      "name": "Explorer",
      "max": 0,
      "spawn": "HQ1",
      "scalarMax": 1,
      "scalarMin": 1,
      "room": "E24N3",
      "position": [22,10],
      "energySource": "677972935e0ceb001d55be31"
    },
    {
      "name": "Builder",
      "max": 0,
      "room": "E24N3",
      "spawn": "HQ1",
      "pickup": true,
      "scalarMax": 4,
      "energySource": "677972935e0ceb001d55be31"
    },

  ],
}