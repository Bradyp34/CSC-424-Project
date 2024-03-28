import { expect, use } from 'chai'; //import chai from 'chai';
import chaiHttp from 'chai-http';
import {app} from '../server.js';

//const { expect } = chai;
use(chaiHttp); //chai.use(chaiHttp);

describe('Express Server', () => {
    // Test for the root path
    it('GET / should return 200 OK', done => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Hello, world!');
                done();
            });
    });

    // Test for the /Login route with missing body data
    it('POST /Login should return 400 for invalid request', done => {
        chai.request(app)
            .post('/Login')
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.equal('invalid username or password');
                done();
            });
    });
});
