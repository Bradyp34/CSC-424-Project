import {chai} from 'chai';
import {chaiHttp} from 'chai-http';
import {pkg} from '../server.js';
const { app } = pkg;
// import app from '../server.js'; // Ensure the path is correct and '.js' extension is specified

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

  // Add more test cases as needed
});
