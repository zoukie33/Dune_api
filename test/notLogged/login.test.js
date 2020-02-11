const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect, should } = chai;
chai.use(chaiHttp);
describe('NotLogged - Auth - Login', () => {
  it('Login an User', done => {
    chai
      .request(app)
      .post('/login')
      .send({ email: 'elodie.berthaud1@gmail.com', password: 'Patoune1234' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Token generated');
        should(res.body.token).exist;
        done();
      });
  });
});
