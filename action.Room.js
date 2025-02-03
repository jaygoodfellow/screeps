const roleTower = require('role.Tower')

module.exports =  function (room) {
  const r = Game.rooms[room]
  if(!r) return
  //Run Towers
  roleTower.run(r)

  //Run Memory Hits Updates
  if(!Memory.rooms[room]) Memory.rooms[room] = {}
  if(!Memory.rooms[room].minWall) Memory.rooms[room].minWall = 0.000001
  if(!Memory.rooms[room].minRampart) Memory.rooms[room].minRampart = 0.000001

  if (Game.time % 1800 == 0) {
    console.log(`-------------Room ${room}-------------`)
    //determine wall hits level to be maintained
    const minWall = r.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_WALL } }).sort((a, b) => b.hits - a.hits).pop();
    if (minWall) {
      const minHits = minWall.hits
      const maxHits = minWall.hitsMax

      const oldWall = Memory.rooms[room].minWall
      Memory.rooms[room].minWall = fillContainer(minHits / maxHits)
      console.log(`Wall hits level changed from ${oldWall} to ${Memory.rooms[room].minWall}`)
    }
    const minRampart = r.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_RAMPART } }).sort((a, b) => b.hits - a.hits).pop();
    if (minRampart) {
      const minHits = minRampart.hits
      const maxHits = minRampart.hitsMax

      const oldRampart = Memory.rooms[room].minRampart

      Memory.rooms[room].minRampart = fillContainer2(minHits / maxHits)
      console.log(`Rampart hits level changed from ${oldRampart} to ${Memory.rooms[room].minRampart}`)
    }
  }

  //store controller progress
  const c = Game.rooms[room].controller
  if(!Game.rooms[room].memory.cStat) Game.rooms[room].memory.cStat = []
  Game.rooms[room].memory.cStat.push(c.progress/c.progressTotal)
  Game.rooms[room].memory.cStat = Game.rooms[room].memory.cStat.slice(-1000)

  //output controller progress
  if(Game.time % 600 == 0) {
    const timeFormatted = formatTime(estimateTimeRemaining(Game.rooms[room].memory.cStat));
    
      console.log(
        `[${room}] Controller Level ${c.level} to ${c.level + 1} time left is ${timeFormatted.days} days, ${timeFormatted.hours} hours, ${timeFormatted.minutes} minutes, and ${timeFormatted.seconds} seconds. ${r.energyCapacityAvailable }`
      );
  }

    const resourcePrices = {
      "energy": {
        "buy": 15.0,
        "sell": 25.0
      },
      "K": {
        "buy": 10.0,
        "sell": 12.0      
      },
      "Z": {
        "buy": 75.0,
        "sell": 95.0
      },
    }
    
    // transfering to another terminal
    // if (Game.time % 10 == 0 && room == 'E23N2') {
    //   const amount = 1500;
    //   const toRoom = 'E22N3';
    //   const resource = 'Z';
    //   const fromRoom = 'E23N2';
    //   const cost = Game.market.calcTransactionCost(amount, toRoom, fromRoom)
    //   const transfer_result = Game.rooms[fromRoom].terminal.send(resource, amount, toRoom, `sending ${amount} ${resource}`);
    //   console.log(`${resource} transfer of ${amount} from ${fromRoom} to ${toRoom} for ${cost} energy was ${transfer_result}`)
    // }
  // if (Game.time % 30 == 0 && room == 'E23N2') {
  //   const transfer_result = Game.rooms['E23N2'].terminal.send(RESOURCE_ENERGY, 2000, 'E23N3', 'offloading energy');
  //   if(transfer_result != 0) {
  //     console.log(`Error transferring energy: ${transfer_result}`)
  //   }
  // }

    // transfering between links in room
    // const linkFrom = Game.rooms['E16N12'].lookForAt(LOOK_STRUCTURES, 42, 32)[0];
    // const linkTo = Game.rooms['E16N12'].lookForAt(LOOK_STRUCTURES, 30, 11)[0];
    // console.log(linkFrom, linkTo)
    // const linkTo = linkFrom.pos.findInRange(FIND_MY_STRUCTURES, 2, {filter: {structureType: STRUCTURE_LINK}})[0];
    // const linkResult = linkFrom.transferEnergy(linkTo);
    // console.log(linkResult)


    // Selling minerals from terminal
    // if(Game.time % 10 == 0 && room =='E23N2') {
    //   const resource = 'Z';
    //   const order = 'sell'; 
    //   const amount = 1500;
    //   const sellRoom = 'E23N2';
    //  const orderConfig = {
    //       type: order,
    //       resourceType: resource,
    //       price: resourcePrices[resource][order],
    //       totalAmount: amount,
    //       roomName: sellRoom
    //     }
        // console.log(JSON.stringify(orderConfig))
      // console.log(`Estimating ${resource} ${order} order for ${amount} in ${sellRoom} - ${resourcePrices[resource][order]*amount*0.05}`)
      // const createOrder = Game.market.createOrder(orderConfig);
      // console.log(createOrder)
    // }
    if (Game.time % 500 == 0 && Game.rooms[room].terminal && room == 'E23N2') {
      const resourceType = Object.keys(Game.rooms[room].terminal.store).filter(resource => resource != 'energy')
      for(let resource of resourceType) {
        const resourceAmount = Game.rooms[room].terminal.store[resource] > 75000 ? 75000 : Game.rooms[room].terminal.store[resource]
          
        let orders = Game.market.getAllOrders({ type: ORDER_BUY, resourceType: resource  });
       
          if(orders.length > 0){      
            const filteredOrders = []
            for(let order of orders) {
              const cost = Game.market.calcTransactionCost(resourceAmount, room, order.roomName)
              filteredOrders.push({
                ...order,
                cost
              })
            }

            const order = filteredOrders.sort((a, b) => a.cost - b.cost).pop()
          console.log(JSON.stringify(order))
            const orderResponse = Game.market.deal(order.id, resourceAmount, room);
            if (orderResponse == 0) {
              console.log(`Dealt ${resourceAmount} ${resource} from ${room} to ${order.roomName} for ${order.cost} energy`)
            } else{
              console.log(`Error (${orderResponse}) dealing ${resourceAmount} ${resource} from ${room} to ${order.roomName} for ${order.cost} energy`)
            }
          }
        }
      }
    
}



function estimateTimeRemaining(progressArray) {
  if (progressArray.length < 2) {
    throw new Error("At least two progress entries are required to estimate time remaining.");
  }

  // Calculate the average rate of progress
  let totalRate = 0;
  for (let i = 1; i < progressArray.length; i++) {
    totalRate += progressArray[i] - progressArray[i - 1];
  }
  const averageRate = totalRate / (progressArray.length - 1);

  // Handle cases where averageRate is 0 or very small to avoid infinite time
  if (averageRate <= 0) {
    throw new Error("The progress is not increasing, unable to estimate time remaining.");
  }

  // Calculate how much progress is left
  const remainingProgress = 1 - progressArray[progressArray.length - 1];

  // Estimate time remaining
  const timeRemaining = remainingProgress / averageRate * (averageTimeDifference(Memory.lastTicks) / 1000)


  return Math.ceil(timeRemaining); // Round up to the nearest second
}

function formatTime(seconds) {
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return { days, hours, minutes, seconds };
}

function averageTimeDifference(timestamps) {
  if (timestamps.length < 2) return 0;
  let diffs = timestamps.slice(1).map((t, i) => t - timestamps[i]);
  return diffs.reduce((sum, diff) => sum + diff, 0) / diffs.length;
}


function fillContainer(t, alpha = 0.9825) {
  // t in [0, 1]
  // alpha in (0, 1)  -- tweak alpha to control "steepness"
  const startValue = 1;
  const endValue = 300000000; // 300 million
  return Math.ceil(startValue + (endValue - startValue) * Math.pow(t, alpha));
}


function fillContainer2(t, alpha = 0.9825) {
  // t in [0, 1]
  // alpha in (0, 1)  -- tweak alpha to control "steepness"
  const startValue = 1;
  const endValue = 100000000; // 100 million
  return Math.ceil(startValue + (endValue - startValue) * Math.pow(t, alpha));
}