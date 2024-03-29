const winston = require('winston');
const path = require('path');

// Custom error class
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.status = 400;
    }
}

// Error handling middleware
const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Logger instance for error logging

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, 'logs', 'error.log') })
    ]
});


// Logging middleware
const loggingMiddleware = (err, req, res, next) => {
    logger.error(err.message, { error: err.stack });
    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = {
    BadRequestError,
    errorHandlerMiddleware,
    loggingMiddleware
};
