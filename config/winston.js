const winston = require('winston');
const rTracer = require('cls-rtracer');

const customFormat = winston.format.printf((info) => {
    const requestId = rTracer.id();
    const logData = {
        timestamp: info.timestamp,
        level: info.level,
    };
    if (requestId) {
        logData.requestId = requestId;
    }
    logData.message = info.message;
    return JSON.stringify(logData);
});

function createLoggerFor() {
    return winston.createLogger({
        format: winston.format.combine(winston.format.timestamp(), customFormat),
        transports: [new winston.transports.Console()],
    });
}

global.logger = createLoggerFor();
