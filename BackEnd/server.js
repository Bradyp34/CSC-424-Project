const express = require('express')
const sqlite = require('better-sqlite3')
const app = express()
const PORT = 8080

app.listen(PORT, () => {
    console.log(`server now live on ${PORT}`)
})