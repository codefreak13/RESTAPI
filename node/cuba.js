const EventEmitter = require("events");

//require from another file
const Logger = require("./nodeExport");

const logger = new Logger();

//register a listener
logger.on("messageLogged", arg => {
  console.log("I am learning node", arg);
});

logger.check("cuba");
