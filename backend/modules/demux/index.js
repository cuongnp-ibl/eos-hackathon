const Events = require('events');
const eventEmitter = new Events.EventEmitter();

function syncBlock() {

}

setTimeout(() => {
  syncBlock()
}, 10000)
