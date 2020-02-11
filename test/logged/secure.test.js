const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

import { loginWithDefaultUser } from '../common.test';

const { expect } = chai;

chai.use(chaiHttp);
describe('Logged - facturation/secure - verifPassword', () => {
  var token;

  before(async () => {
    var resToken = await loginWithDefaultUser();
    token = resToken.body.token;
  });
  it('verifPassword - OK - query', done => {
    chai
      .request(app)
      .post('/facturation/secure/verifPassword')
      .send({ token: token, password: 'Patoune1234' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('verifPassword - bad request', done => {
    chai
      .request(app)
      .post('/facturation/secure/verifPassword')
      .send({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('verifPassword - Not Authed', done => {
    chai
      .request(app)
      .post('/facturation/secure/verifPassword')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
