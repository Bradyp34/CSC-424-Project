const express = require('express');
const sqlite = require('better-sqlite3');
const path = require('path');
const { errorHandlerMiddleware, loggingMiddleware, BadRequestError } = require('./errorHandlers'); //Error Handling
const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello, world!');
});

app.post("/Login", (req, res, next) => {
    try {
        if (req.body.username === undefined || req.body.password === undefined) {
            throw new BadRequestError('Invalid username or password');
        }
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
app.use(errorHandlerMiddleware);
app.use(loggingMiddleware);

app.listen(PORT, () => {
    console.log(`Server now live on ${PORT}`);
});

module.exports = { app };

