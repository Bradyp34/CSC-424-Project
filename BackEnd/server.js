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

async function isValidAdmin(adminCredentials){
  try {
    const {username, email, password} = adminCredentials;
    console.log("Validating admin credentials:", adminCredentials);// Debugging purposes
    const admin = await db.prepare("select * from users where username = ? and email = ? and password = ? and user_type = 'admin'").get(username, email, password);
    console.log("Admin found:", admin);// Debugging purposes
    return admin != undefined;
  } catch (error) {
    console.error("Error validating admin credentials:", error);
    return false;
  }
}


app.post("/Register", async (req, res) => {
  const adminInfo = req.headers["admin-info"];
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
  
  if(!adminInfo)
  {
    const repeated_username = db.prepare("select * from users where username = ?").get(username);
    if(repeated_username !== undefined ){
      res.status(400).send("Username already exists");
      return;
    }
    const repeated_email = db.prepare("select * from users where email = ?").get(email);
    if(repeated_email !== undefined){
      res.status(400).send("Account with the email provided already exists");
      return;
    }
    try {
      const statement = db.prepare(
        "insert into users(username, user_type, email, password) values(?, ?, ? ,?)"
      );
     // const user_type = "admin";
      const response = statement.run(username, user_type, email, password);
      //   console.log("Account Creation sucessful")
      return res.status(201).send("Account Creation Sucessful");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
}

  const adminCredentials = JSON.parse(adminInfo);
  if (!(await isValidAdmin(adminCredentials))) {
    return res.status(400).send("Unauthorized: Invalid admin credentials");
  }

});

app.post("/Login", async (req, res) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    res.status(400).send("Hello, world!");
  }
  res.status(200).send("Login confirmed");
});

const server = app.listen(PORT, () => {
  console.log(`server now live on ${PORT}`);
});

module.exports = { app, server };
