const express = require('express');
const sqlite = require('better-sqlite3');
const path = require('path');
const { errorHandlerMiddleware, loggingMiddleware, BadRequestError } = require('./error_handling/errorHandlers'); //Error Handling
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(errorHandlerMiddleware);
app.use(loggingMiddleware);

app.get('/', (req, res) => {
    console.log('get request made')
    res.status(200).send('Hello, world!');
});

app.post('/Register', (req, res) => {
    if (req.body.username === undefined || req.body.email === undefined || req.body.password === undefined)
    {
        res.status(400).send('Missing fields / parameters')
    }
    // to be continued
})
app.post("/Login", (req, res) => {
    if (req.body.username === undefined || req.body.password === undefined) {
        res.status(400).send('Hello, world!');
    }
    res.status(200).send("Login confirmed")
});


const server = app.listen(PORT, () => {
    console.log(`server now live on ${PORT}`);
});



module.exports = { app , server};

