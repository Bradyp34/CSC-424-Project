const express = require('express');
const sqlite = require('better-sqlite3');
const path = require('path');
const winston = require('winston'); //Error Handling
const app = express();
const PORT = 8080;

app.use(express.json());

//Custom error class we could add more in the future use this
class BadRequestError extends Error{
    constructor(message){
        super(message);
        this.name = 'BadRequestError';
        this.status = 400;
    }
}

//Error handling middleware
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({error: 'Internal Server Error'});
});
//This creates an error log file called 
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports:[
        new winston.transports.File({filename: 'error.log'})
    ]
});
//Logging the middleware
app.use((err, req, res, next) => {
    logger.error(err.message, { error: err.stack });
    res.status(500).json({ error: 'Internal Server Error' });
});



app.get('/', (req, res) => {
    res.status(200).send('Hello, world!');
});

app.post("/Login", (req, res) => {
    try{
        if (req.body.username === undefined || req.body.password === undefined) {
            throw new BadRequestError('Invalid username or password');
        } 
    } catch(error){
        next(error);
    }
});

app.listen(PORT, () => {
    console.log(`server now live on ${PORT}`);
});


module.exports = { app };

