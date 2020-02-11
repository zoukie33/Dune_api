const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);
describe('Init Server', () => {
  it('welcomes user to doc Api', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Try invalid path API', done => {
    chai
      .request(app)
      .get('/invalid')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
