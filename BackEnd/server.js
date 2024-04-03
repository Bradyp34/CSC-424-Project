const express = require("express");
const sqlite = require("better-sqlite3");
const path = require("path");
const {
  errorHandlerMiddleware,
  loggingMiddleware,
  BadRequestError,
} = require("./error_handling/errorHandlers");
const app = express();
const fs = require("fs");
const { debugPort } = require("process");
const { use } = import("chai");
const PORT = 3000;
const activity_log_file = "log.txt";
const current_time = new Date();

const db = sqlite("database.db");
const file_date = fs.readFileSync(
  path.resolve(__dirname, "user_schema.sql"),
  "utf-8"
);
db.exec(file_date);

const log = `Server live on port ${PORT}. At ${current_time}\n`;
fs.appendFile(activity_log_file, log, (error) => {
  if (error) {
    console.log(err);
    process.exit(0);
  } else {
    console.log("successfully logged")
  }
});

app.use(express.json());
app.use(errorHandlerMiddleware);
app.use(loggingMiddleware);

app.get("/", (req, res) => {
  const log = `Server live on port ${PORT}. At ${current_time}\n`;
  fs.appendFile(activity_log_file, log, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("successfully logged");
    }
  });
  res.status(200).send("Server now running");
});

app.get("/all_users", async (req, res) => {
  const statement = db.prepare("select * from users").all();
  res.status(200).send(statement);
});


app.post("/Register", async (req, res) => {

  const { username, email, password, user_type } = req.body;
  if (
    username === undefined ||
    email === undefined ||
    password === undefined ||
    user_type === undefined
  ) {
    res.status(400).send("Missing fields / parameters");
    return;
  }

  if (username === "" || email === "" || password === "" || user_type === "") {
    res.status(400).send("Empty fields");
    return;
  }
 
  if (user_type !== "admin" && user_type !=="regular") {
    res.status(400).send("Invalid User Type");
    return;
  } 

    const repeated_username = db.prepare("select * from users where username = ?").all(username);
    if(repeated_username.length > 0){
      res.status(400).send("Username already exists");
      return;
    }
    const repeated_email = db.prepare("select * from users where email = ?").all(email);
    if(repeated_email.length !== 0){
      res.status(400).send("Account with the email provided already exists");
      return;
    }
    try {
      const statement = db.prepare(
        "insert into users(username, user_type, email, password) values(?, ?, ? ,?)"
      );
      const response = statement.run(username, user_type, email, password);
      return res.status(201).send("Account Creation Sucessful");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }

});

/* app.post("/Login", async (req, res) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    res.status(400).send("Hello, world!");
  }
  res.status(200).send("Login confirmed");
});

const server = app.listen(PORT, () => {
  console.log(`server now live on ${PORT}`);
}); */

app.post("/Login", async (req, res) => {
  const { username, password } = req.body;
 
  if (!username || !password) {
     return res.status(400).send("Username and password are required");
  }
 
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  if (!user) {
     return res.status(400).send("Invalid username or password");
  }
 
  if (user.password !== password) {
     return res.status(400).send("Invalid username or password");
  }
 
  // If the password matches, proceed with the login process
  // This could involve setting a session or token for the user
  res.status(200).send("Login successful");
 });
 

module.exports = { app, server };


