const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

import { loginWithDefaultUser, genTokenDef } from '../common.test';

const { expect, assert, should } = chai;
chai.use(chaiHttp);

describe('NotLogged - Auth - cnxTable', () => {
  var token, ThetokenTable;

  before(async () => {
    var resToken = await loginWithDefaultUser();
    token = resToken.body.token;
    var resGenT = await genTokenDef();
    ThetokenTable = resGenT.body.tokenTable;
  });
  // route: genToken
  it('genToken - POST - OK', done => {
    ThetokenTable = chai
      .request(app)
      .post('/cnxTable/genToken')
      .set({ 'content-type': 'application/x-www-form-urlencoded' })
      .send({ idTable: 1 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        should(res.body.tokenTable).exist;
        done();
      });
  });
  it('genToken - POST - 400', done => {
    chai
      .request(app)
      .post('/cnxTable/genToken')
      .set({ 'content-type': 'application/x-www-form-urlencoded' })
      .send({ idTable: 'bonjour' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  // route: verifToken
  /* it('verifToken - GET - Await verif token', done => {
    chai
      .request(app)
      .get('/cnxTable/verifToken/' + ThetokenTable)
      .set({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(202);
        should(res.body.response).exist;
        done();
      });
  }); */
  it('verifToken - GET - 400', done => {
    chai
      .request(app)
      .get('/cnxTable/verifToken/1234')
      .set({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  // route: install
  /* it('install - POST - OK', done => {
    chai
      .request(app)
      .post('/cnxTable/install/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        should(res.body.response).exist;
        done();
      });
  }); */
  it('install - POST - 400', done => {
    chai
      .request(app)
      .post('/cnxTable/install/')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  // route: delToken
/*   it('delToken - DELETE - OK', done => {
    chai
      .request(app)
      .delete('/cnxTable/delToken/' + ThetokenTable)
      .set({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(200);
        should(res.body.response).exist;
        done();
      });
  }); */
  it('genToken - DELETE - 400', done => {
    chai
      .request(app)
      .delete('/cnxTable/delToken/&&&&')
      .set({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
/*   it('genToken - DELETE - 401', done => {
    chai
      .request(app)
      .delete('/cnxTable/delToken/' + ThetokenTable)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  }); */
  // TODO: Faire les tests pour la route cnxTable/install
});
