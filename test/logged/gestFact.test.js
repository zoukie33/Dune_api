const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

import { loginWithDefaultUser } from '../common.test';

const { expect } = chai;

chai.use(chaiHttp);
// route : getFactures
describe('Logged - facturation - getFactures', () => {
  var token;

  before(async () => {
    var resToken = await loginWithDefaultUser();
    token = resToken.body.token;
  });
  it('getFactures - OK - query', done => {
    chai
      .request(app)
      .get('/facturation/getFactures')
      .send({ token: token, password: 'Patoune1234' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('getFactures - Not Authed', done => {
    chai
      .request(app)
      .get('/facturation/getFactures')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
// route : getFacture
describe('Logged - facturation - getFacture', () => {
  var token;

  before(async () => {
    var resToken = await loginWithDefaultUser();
    token = resToken.body.token;
  });
  it('getFacture - OK - query', done => {
    chai
      .request(app)
      .get('/facturation/getFacture/' + 14)
      .set({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('getFacture - bad request', done => {
    chai
      .request(app)
      .get('/facturation/getFacture/oui')
      .set({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('getFacture - Not Authed', done => {
    chai
      .request(app)
      .get('/facturation/getFactures/13')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
