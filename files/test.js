const EventEmitter = require("events");

const Logger=require("./logger");
const logger = new Logger();

logger.on("messageLogged", (e) => console.log("Listener called", e));

logger.log("message");

2 + 3 = 5