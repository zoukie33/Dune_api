const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

import { loginWithDefaultUser } from '../common.test';

const { expect } = chai;

chai.use(chaiHttp);
describe('Logged - Help - contact', () => {
  var token;

  before(async () => {
    var resToken = await loginWithDefaultUser();
    token = resToken.body.token;
  });
  it('contact - OK query', done => {
    chai
      .request(app)
      .post('/help/contact')
      .set({ token: token , 'content-type': 'application/x-www-form-urlencoded'})
      .send({ pbType: "UNIT TEST" })
      .send({ pbDetail: "Detail Unit Test" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('contact - bad request', done => {
    chai
      .request(app)
      .post('/help/contact')
      .send({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('contact - Not Authed', done => {
    chai
      .request(app)
      .post('/help/contact')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
