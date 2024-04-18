const express = require("express");
const sqlite = require("better-sqlite3");
const cors = require("cors");
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
const PORT = 8080;
const activity_log_file = "log.log";
const current_time = new Date();

const db = sqlite("database.db");
const file_date = fs.readFileSync(
  path.resolve(__dirname, "user_schema.sql"),
  "utf-8"
);
db.exec(file_date);

const product_db = sqlite("product_database.db");
const product_file_data = fs.readFileSync(
  path.resolve(__dirname, "product_schema.sql"),
  "utf-8"
);
product_db.exec(product_file_data);

const log = `Server live on port ${PORT}. At ${current_time}\n`;
fs.appendFile(activity_log_file, log, (error) => {
  if (error) {
    console.log(err);
    process.exit(0);
  } else {
    console.log("successfully logged");
  }
});

app.use(express.json());
app.use(errorHandlerMiddleware);
app.use(loggingMiddleware);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  const log = `Server live on port ${PORT}. At ${current_time}\n`;
  fs.appendFile(activity_log_file, log, (err) => {
    if (err) {
      console.log(err);
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
//Gets a specific user according to the given user_id
app.get("/user/:user_id", async (req, res)=>{
  const { user_id } = req.params;
  if (user_id === undefined || user_id === "") {
    return res.status(400).send("Missing search query parameter");
  }

  try {
    const statement = db.prepare(
      "SELECT * FROM users WHERE user_id = ?"
    );
    const response = statement.get(user_id);
    res.status(200).send(response);
  } catch (error) {
    console.error("Error searching items:", error);
    res.status(500).send("Internal server error");
  }
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

  if (user_type !== "admin" && user_type !== "non-admin") {
    res.status(400).send("Invalid User Type");
    return;
  }

  const repeated_username = db
    .prepare("select * from users where username = ?")
    .all(username);
  if (repeated_username.length > 0) {
    res.status(400).send("Username already exists");
    return;
  }
  const repeated_email = db
    .prepare("select * from users where email = ?")
    .all(email);
  if (repeated_email.length !== 0) {
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

app.post("/removeUser", async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).send("Missing fields / parameters");
    }

    const statement = db.prepare(
      "DELETE FROM users WHERE username = ? AND email = ?"
    );
    statement.run(username, email);

    if (statement.changes === 0) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send("User Removed");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/Login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username or Password Missing!");
    }

    const statement2 = db.prepare(
      "SELECT * FROM users WHERE username = ? AND password = ?"
    );
    const userWithPassword = statement2.get(username, password);
    if (!userWithPassword) {
      return res.status(400).send("Invalid Credentials");
    }
    res.status(200).send({
      message:"Login confirmed",
      user_type: userWithPassword.user_type,
      username: userWithPassword.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/searchItems/:item", async (req, res) => {
  const { item } = req.params;

  // const query = req.query.search; // Get the search query from the request

  if (item === undefined || item === "") {
    return res.status(400).send("Missing search query parameter");
  }

  try {
    const statement = product_db.prepare(
      "SELECT * FROM products WHERE product_name = ?"
    );
    const response = statement.get(item);
    res.status(200).send(response);
  } catch (error) {
    console.error("Error searching items:", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/addProduct", async (req, res) => {
  try {
    const {
      product_name,
      product_details,
      product_location,
      total_product_count,
    } = req.body;

    if (
      !product_name ||
      !product_details ||
      !product_location ||
      !total_product_count
    ) {
      return res.status(400).send("Missing Parameters");
    }

    const existingProduct = product_db
      .prepare(
        "SELECT total_product_count FROM products WHERE product_name = ?"
      )
      .get(product_name);

    if (existingProduct) {
      const updatedCount =
        existingProduct.total_product_count + total_product_count;
      product_db
        .prepare(
          "UPDATE products SET total_product_count = ? WHERE product_name = ?"
        )
        .run(updatedCount, product_name);
      return res.status(201).send("Product count updated successfully");
    } else {
      product_db
        .prepare(
          "INSERT INTO products (product_name, product_details, product_location, total_product_count) VALUES (?, ?, ?, ?)"
        )
        .run(
          product_name,
          product_details,
          product_location,
          total_product_count
        );
      return res.status(201).send("Product added successfully");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

app.get("/all_products", async (req, res) => {
  const statement = product_db.prepare("select * from products").all(); // Use product_db here
  res.status(200).send(statement);
});

app.put("/updateProduct/:productName", (req, res) => { //This one Updates A specific Field in the product, in this implementation we don't 
                                                      //need to provide all the fields for the product we are updating 
  const { productName } = req.params;
  const updatedFields = req.body;

  if (!productName) {
      return res.status(400).json({ message: "Product name is required." });
  }

  if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No fields to update provided." });
  }

  const setStatements = [];
  const params = [];

  Object.keys(updatedFields).forEach((key) => {
      if (key !== 'product_name') {
          setStatements.push(`${key} = ?`);
          params.push(updatedFields[key]);
      }
  });

  params.push(productName);

  const updateQuery = `UPDATE products SET ${setStatements.join(", ")} WHERE product_name = ?`;

  try {
      const stmt = product_db.prepare(updateQuery);
      const info = stmt.run(...params);

      if (info.changes > 0) {
          return res.status(200).json({ message: "Product updated successfully." });
      } else {
          return res.status(404).json({ message: "Product not found." });
      }
  } catch (error) {
      console.error("Error updating product by name:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/removeProduct/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!productId) {
      return res.status(400).send("Product ID is missing.");
    }

    const existingProduct = product_db
      .prepare("SELECT * FROM products WHERE product_id = ?")
      .get(productId);
    if (!existingProduct) {
      return res.status(404).send("Product not found.");
    }

    const { product_status } = existingProduct;

    if (product_status === "sold") {
      product_db
        .prepare(
          "UPDATE products SET product_sale_count = product_sale_count - 1 WHERE product_id = ?"
        )
        .run(productId);
    } else if (product_status === "on-hold") {
      product_db
        .prepare(
          "UPDATE products SET product_on_hold_count = product_on_hold_count - 1 WHERE product_id = ?"
        )
        .run(productId);
    }

    product_db
      .prepare("DELETE FROM products WHERE product_id = ?")
      .run(productId);

    return res.status(200).send("Product Removed");
  } catch (error) {
    console.error("Error removing product:", error);
    return res.status(500).send("Internal server error");
  }
});

const server = app.listen(PORT, () => {
  console.log(`server now live on ${PORT}`);
});

module.exports = { app, server };
