import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '/BackEnd/server.js'; // Your Express app
const { expect } = chai;

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

  function add(a, b) {
    return a + b;
  }
  
  module.exports = { add };  

  // Add more test cases as needed
});
