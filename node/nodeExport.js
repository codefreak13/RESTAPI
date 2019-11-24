//Operating system method-for info of the os
// const os = require("os");

// const mem = os.userInfo();

// console.log(mem);

const EventEmitter = require("events");

class Logger extends EventEmitter {
  check(cuba) {
    console.log(cuba);

    //raise an event
    this.emit("messageLogged", { id: 1, url: "http://" });
  }
}

module.exports = Logger;
