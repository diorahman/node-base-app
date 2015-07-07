
var util = require('util');
var winston = require('winston');

var production = (process.env.NODE_ENV || '').toLowerCase() === 'production'

var logger = new winston.Logger();

// Override the built-in console methods with winston hooks
switch((process.env.NODE_ENV || '').toLowerCase()){
  case 'production':
    production = true;

    logger.add(winston.transports.Console, {
      colorize: true,
      timestamp: true
    });

    break;
  case 'test':
    // Don't set up the logger overrides
    return;
  default:
    logger.add(winston.transports.Console, {
      colorize: true,
      timestamp: true
    });
    break;
}

function formatArgs(args){
  return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}

console.log = function(){
  logger.info.apply(logger, formatArgs(arguments));
};

console.info = function(){
  logger.info.apply(logger, formatArgs(arguments));
};

console.warn = function(){
  logger.warn.apply(logger, formatArgs(arguments));
};

console.error = function(){
  logger.error.apply(logger, formatArgs(arguments));
};

console.debug = function(){
  logger.debug.apply(logger, formatArgs(arguments));
};
