const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

import { loginWithDefaultUser } from '../common.test';

const { expect } = chai;

chai.use(chaiHttp);
describe('NotLogged - Auth - Tokens', () => {
  var token;

  before(async () => {
    var resToken = await loginWithDefaultUser();
    token = resToken.body.token;
  });
  // route: verifyToken
  it('verifyToken - with header', done => {
    chai
      .request(app)
      .post('/tokens/verifyToken')
      .set({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('verifyToken - with post', done => {
    chai
      .request(app)
      .post('/tokens/verifyToken')
      .send({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
