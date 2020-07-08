import path from 'path';
import winston from 'winston';
// import { support } from 'fluent-logger';

/** Since our config imports Logger we cannot load environment variables from our config file and must import them directly */
const NODE_ENV =
  typeof process.env.NODE_ENV !== 'undefined'
    ? process.env.NODE_ENV
    : 'development';
const SILENT_LOGGING = NODE_ENV === 'test';
const logLevel =
  typeof process.env.LOG_LEVEL !== 'undefined' ? process.env.LOG_LEVEL : 'info';

/**
 * gets the path of the logging statement
 *
 * @param {module} callingModule node module calling the logger
 * @returns {string} path of the logging statement
 */
function getLabel(callingModule: NodeModule): string {
  const parts = callingModule.filename.split(path.sep);
  const namedPath = path.join(...parts.slice(parts.indexOf('src') + 1));
  return namedPath;
}
// const fluentTransport = support.winstonTransport();
// // eslint-disable-next-line camelcase
// const fluent_config = {
//   host: 'localhost',
//   port: 24224,
//   timeout: 3.0,
//   requireAckResponse: true
// };

// // eslint-disable-next-line new-cap
// const fluent = new fluentTransport('sever_1', fluent_config);

export default (callingModule: NodeModule): winston.Logger => {
  const transports = [];
  if (!['development', 'testing'].includes(NODE_ENV)) {
    transports.push(new winston.transports.Console());
  } else {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.label({ label: getLabel(callingModule) }),
          winston.format.simple(),
          winston.format.colorize({ all: true }),
          winston.format.splat(),
          winston.format.printf(
            info =>
              `[${info.timestamp}] [${info.label}] [${info.level}]: ${
                info.message
              } ${typeof info.stack !== 'undefined' ? info.stack : ''}`
          )
        )
      })
    );
  }
  const logger = winston.createLogger({
    level: logLevel,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    silent: SILENT_LOGGING,
    transports
  });
  // logger.add(new LogdnaWinston(options));
  return logger;
};
