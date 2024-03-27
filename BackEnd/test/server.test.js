// test/server.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe('Server', () => {
  it('should return 200 OK status', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Add more test cases as needed
});
