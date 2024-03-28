const express = require('express');
const sqlite = require('better-sqlite3');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.json());

app.post("/Login", (req, res) => {
    if (req.body.username === undefined || req.body.password === undefined) {
        res.status(400).send("invalid username or password");
    }
});

app.listen(PORT, () => {
    console.log(`server now live on ${PORT}`);
});

module.exports = {app};

app.get('/', (req, res) => {
    res.status(200).send('Hello, world!');
});

