const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

import { loginWithAdminUser } from '../common.test';

const { expect } = chai;

chai.use(chaiHttp);
// routes : Creators
describe('Logged - Admin - Creators', () => {
  var token;

  before(async () => {
    var resToken = await loginWithAdminUser();
    token = resToken.body.token;
  });
  it('getCreators - OK - query', done => {
    chai
      .request(app)
      .get('/admin/creators/')
      .set({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('genApiKey - OK - query', done => {
    chai
      .request(app)
      .get('/admin/creators/genApiKey/1')
      .set({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  // TODO: corriger ce tu
  /* it('genApiKey - NOK - idCreator', done => {
    chai
      .request(app)
      .get('/admin/creators/genApiKey/15')
      .set({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  }); */
});
