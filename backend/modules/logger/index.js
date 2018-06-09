let logger = function(){}

logger.prototype.trace = (log) => {
  console.trace(log);
};

logger.prototype.debug = (log) => {
  console.debug(log);
};

logger.prototype.info = (log) => {
  console.info(log);
};

logger.prototype.warn = (log) => {
  console.warn(log);
};

logger.prototype.error = (log) => {
  console.error(log);
};

logger.prototype.fatal = (log) => {
  console.error(log);
};

module.exports = new logger()
