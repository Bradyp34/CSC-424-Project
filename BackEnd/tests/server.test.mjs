import assert from "assert";
import request from "supertest";
import { app, server } from "../server.js"; // Adjust the path as needed

describe("Server API Test Suite", function () {
  // Test case: Check if server is running
  it("Should return 200 OK when server is running", function (done) {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.text, "Server now running");
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
      .post("/Register")
      .send(incompleteUser)
      .expect(400) // 400 Bad Request status code for missing or invalid data
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, expectedMessage);
        done();
      });
  });

    //Test case: checking to see if any of the fields are empty
    it("Should return an error when information fields are empty", function (done) {
      const expectedMessage = "Empty fields";
      //Empty fields
      const incompleteUser = {
        username: "",
        email: "",
        password: "",
        user_type: ""
      };
      request(app)
        .post("/Register")
        .send(incompleteUser)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          assert.strictEqual(res.text, expectedMessage);
          done(); 
        });
    });

  // Test case: Check for login with an non existing username
  it("Should return an error message for trying to log in with a new username", function(done){
    const expectedMessage = "Invalid Credentials";
    const data = {
      username: "NewUsername",
      password: "pass"
    };
    request(app)
      .post("/Login")
      .send(data)
      .expect(400)
      .end(function(err, res){
        if(err) return done(err);
          assert.strictEqual(res.text, expectedMessage);
          done();
      });
  });

  //Test case: Check for missing username while trying to log in
  it("Should return an error message for trying to login with missing username", function(done){
    const expectedMessage = "Username or Password Missing!";
    const data = {
      password: "pass"
    };
    request(app)
     .post("/Login")
     .send(data)
     .expect(400)
     .end(function(err, res){
        if(err) return done(err);
        assert.strictEqual(res.text, expectedMessage);
        done();
     });
  });

  //Test case: Check for missing password while trying to log in
  it("Should return an error message for trying to login in missing password", function(done){
    const expectedMessage = "Username or Password Missing!";
    const data = {
      username: "user"
    };
    request(app)
     .post("/Login")
     .send(data)
     .expect(400)
     .end(function(err, res){
        if(err) return done(err);
        assert.strictEqual(res.text, expectedMessage);
        done();
     });
  });


  // Test case: Check if 404 is returned for invalid endpoint
  it("Should return 404 for invalid endpoint", function (done) {
    request(app).get("/invalid").expect(404, done);
  });

  // Test case: Check if admin can create new admin accounts
  it("Should allow administrators to create new accounts", function (done) {
    const sampleAccountInformaiton = {
      username: "Admin",
      password: "adminpass",
      user_type: "admin",
      email: "admin999@example.com"
    };
    request(app)
      .post("/Register")
      .send(sampleAccountInformaiton)
      .expect(201) // Code for successful account creation
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, "Account Creation Sucessful");
        done();
      });
  });

  // Test case: Check if an admin can register a new non-admin account
it("Should allow registration of a new user by an admin", function (done) {
  const newUser = {
    username: "newuser2",
    email: "newuser2@example.com",
    password: "newpassword2",
    user_type: "non-admin",
  };
  request(app)
    .post("/Register")
    .send(newUser)
    .expect(201)
    .end(function (err, res) {
      if (err) return done(err);
      assert.strictEqual(res.text,  "Account Creation Sucessful");
      done();
    });
});

  // Test case: Register new user with existing username
  it("Should return an error when registering with existing username", function (done) {
    const existingUser = {
      username: "newuser2",
      email: "newuser233@example.com",
      password: "newpassword2",
      user_type: "non-admin",
    };

    request(app)
      .post("/Register")
      .send(existingUser)
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text,"Username already exists");
        done();
      });
  });
  //Test case: Register new user with an existing email
  it("Should return an error when registering with existing email", function (done) {
    const existingEmailUser = {
      username: "newuser21",
      email: "newuser2@example.com",
      password: "newpassword2",
      user_type: "non-admin",
    };
    request(app)
      .post("/Register")
      .send(existingEmailUser)
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, "Account with the email provided already exists");
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
      password: "newpassword3",
    };
    request(app)
      .post("/Register")
      .send(invalidUserTypeUser)
      .expect(400) // 400 for Bad Request status code for invalid data
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, expectedMessage);
        done();
      });
  });
   // Test case: Check for valid login
   it("Should return a greeting message", function (done) {
    const expectedGreeting = "Login confirmed";
    const data = {
      username: "newuser2",
      password: "newpassword2"
    };
    request(app)
      .post("/Login")
      .send(data)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        const response = JSON.parse(res.text)
        assert.strictEqual(response.message, expectedGreeting);
        done();
      });
  });

  // Test case: Check for login with a wrong password for an existing user
  it("Should return an error message for trying to log in with wrong password", function(done){
    const expectedMessage = "Invalid Credentials";
    const test_data = {
      username: "newuser2",
      password: "wrong_pass"
    };
    request(app)
      .post("/Login")
      .send(test_data)
      .expect(400)
      .end(function(err, res){
        if(err) return done(err);
          assert.strictEqual(res.text, expectedMessage);
          done();
      });
  });

  // Test case: Admin can remove a user(For now it is just able to remove user)
  it("Should allow the removal of a user", function(done){
    const expectedMessage = "User Removed";
    const userToBeRemoved = {
      username: "newuser2",
      email: "newuser2@example.com",
    };
    request(app)
      .post("/removeUser")
      .send(userToBeRemoved)
      .expect(200) // User Removal is sucessful 
      .end(function(err, res){
        if(err) return done(err);
        assert.strictEqual(res.text, expectedMessage);
        done();
      });
  });

  // Test case Admin should be able to add new products
    it("Should allow the addition of a product", function(done){
      const expectedMessage = "Product added successfully";
      const newProduct = {
        product_name: "sampleProduct",
        product_details: "sample product description",
        product_location: "sampleLocation",
        total_product_count: 10
      }
      request(app)
        .post("/addProduct")
        .send(newProduct)
        .expect(201)
        .end(function(err, res){
          if(err) return done(err);
          assert.strictEqual(res.text, expectedMessage);
          done();
        });
    });
  
    

 // Test case: Update only the product_status field of an existing product by name
it("Should update only the product_status field of an existing product by name", function (done) {
  const productNameToUpdate = "sampleProduct"; 
  const updatedProductData = {
    product_status: "sold" 
  };

  request(app)
    .put(`/updateProduct/${encodeURIComponent(productNameToUpdate)}`)
    .send(updatedProductData)
    .expect(200) // Expecting a successful update
    .end((err, res) => {
      if (err) return done(err);
      assert.strictEqual(res.body.message, "Product updated successfully.");
      done();
    });
});

  // Test case: Remove an existing product
  it("Should remove an existing product", function (done) {
    const productIdToRemove = 1;

    request(app)
      .post(`/removeProduct/${productIdToRemove}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.text, "Product Removed");
        done();
      });
  });

  // Test case: Try to remove a non-existing product
  it("Should return 404 when removing a non-existing product", function (done) {
    const nonExistingProductId = 9999; // Assuming productId 9999 does not exist in the database

    request(app)
      .post(`/removeProduct/${nonExistingProductId}`)
      .expect(404) // Expecting product not found
      .end(done);
  });
  // Close the server after all tests have completed
  after(function () {
    server.close();
  });
});
