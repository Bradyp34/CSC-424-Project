import assert from "assert";
import request from "supertest";
import { app, server } from "../server.js"; // Adjust the path as needed

describe("Server API Test Suite", function () {
  // Test case: Check if server is running
  it("Should return 200 OK when server is running", function (done) {
    request(app).get("/").expect(200, done);
  });

  // Test case: Check for valid login
  it("Should return a greeting message", function (done) {
    const expectedGreeting = "Login confirmed";
    const data = {
      username: "ismail",
      password: "hi",
    };
    request(app)
      .post("/Login")
      .send(data)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, expectedGreeting);
        done();
      });
  });

  // Test case: Check if 404 is returned for invalid endpoint
  it("Should return 404 for invalid endpoint", function (done) {
    request(app).get("/invalid").expect(404, done);
  });

  // Test case: Check if administrator can create new admin accounts
  it("Should allow administrators to create new accounts", function(done){
    const expectedMessage = "Account Creation Sucessful";
    const sampleAccountInformaiton = {
        username: "Admin",
        password: "adminpass",
        user_type: "admin",
        email: "admin@example.com"
    };
    request(app)
    .post("/register")
    .send(sampleAccountInformaiton)
    .expect(201) // Code for successful account creation
    .end(function(err, res){
        if(err) return done(err);
        assert.strictEqual(res.text, expectedMessage);
        assert.strictEqual(res.body.user_type, "admin", "Expected user_type to be 'admin'");
        done();
    })
  });

  // Test case: Check if non-administrators can create accounts
  it("Should allow registration of a new user", function (done) {
    const expectedMessage = "Account Creation Sucessful";
    const newUser = {
      username: "newuser",
      user_type: "non-admin",
      email: "newuser@example.com",
      password: "newpassword"
    };
    request(app)
      .post("/register")
      .send(newUser)
      .expect(201) // Assuming 201 Created status code for successful registration
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, expectedMessage);
        assert.strictEqual(res.body.user_type, "non-admin", "Expected user_type to be 'non-admin'");
        done();
      });
  });
// Test case: Register new user with existing username
it("Should return an error when registering with existing username", function (done) {
    const expectedMessage = "Username already exists";
    const existingUser = {
      username: "existinguser",
      user_type: "non-admin",
      email: "existinguser@example.com",
      password: "existingpassword"
    };
    request(app)
      .post("/register")
      .send(existingUser)
      .expect(409) // Assuming 409 Conflict status code for duplicate resource
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, expectedMessage);
        done();
      });
  });
  //Test case: Register new user with an existing email
  it("Should return an error when registering with existing email", function (done) {
    const expectedMessage = "Account with the email provided already exists";
    const existingEmailUser = {
      username: "newuser2",
      user_type: "non-admin",
      email: "existinguser@example.com",
      password: "newpassword2"
    };
    request(app)
      .post("/register")
      .send(existingEmailUser)
      .expect(409) // Assuming 409 Conflict status code for duplicate resource
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text,expectedMessage);
        done();
      });
  });
  //Test case: trying to register new user with missing fields
  it("Should return an error when registering with missing required fields", function (done) {
    const expectedMessage = "Missing fields / parameters";
    const incompleteUser = {
      //Missing fields
    };
    request(app)
      .post("/register")
      .send(incompleteUser)
      .expect(400) // 400 Bad Request status code for missing or invalid data
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, expectedMessage);
        done(); 
      });
  });
  // Test case: Register a new user with an invalid user_type 
  it("Should return an error when registering with invalid user type", function (done) {
    const expectedMessage = "Invalid User Type";
    const invalidUserTypeUser = {
      username: "newuser3",
      user_type: "invalid-type",
      email: "newuser3@example.com",
      password: "newpassword3"
    };
    request(app)
      .post("/register")
      .send(invalidUserTypeUser)
      .expect(400) // 400 for Bad Request status code for invalid data
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, expectedMessage);
        done();
      });
  });
  
  // Close the server after all tests have completed
  after(function () {
    server.close();
  });
});

