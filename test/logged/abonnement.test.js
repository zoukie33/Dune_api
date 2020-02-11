const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

import { loginWithDefaultUser } from '../common.test';

const { expect } = chai;

chai.use(
  chaiHttp
); /* 
describe('Logged - abonnement - subscribe', () => {
  var token;

  before(async () => {
    var resToken = await loginWithDefaultUser();
    token = resToken.body.token;
  });
  it('subscribe - OK - query', done => {
    chai
      .request(app)
      .get('abonnement/subscribe')
      .set({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
 */
