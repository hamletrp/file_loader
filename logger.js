const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'file_loader-service' },
    transports: [
        //
        // - Write to all logs with level `info` to `info.log` 
        // - Write all logs error to `error.log`.
        //
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/info.log', level: 'info' })
    ]
});

module.exports.logger = logger;