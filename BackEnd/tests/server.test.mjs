import assert from "assert";
import request from "supertest";
import { app, server } from "../server.js"; // Adjust the path as needed

describe("Server API Test Suite", function () {
  // Test case: Check if server is running
  it("Should return 200 OK when server is running", function (done) {
    request(app).get("/").expect(200, done);
  });

  // Test case: Check if greeting message is returned correctly
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

  // Close the server after all tests have completed
  after(function () {
    server.close();
  });
});
