const app = require('../app');
const request = require('supertest')(app);
const chai = require('chai');
const should = chai.should();

const defaultUser = {
  email: 'elodie.berthaud1@gmail.com',
  password: 'Patoune1234'
};

const adminUser = {
  email: 'romain.gadrat@epitech.eu',
  password: 'fnbxfzmxfn33'
};

export const loginWithDefaultUser = async () => {
  return request
    .post('/login')
    .send({ email: defaultUser.email, password: defaultUser.password })
    .expect(200);
};

export const loginWithAdminUser = async () => {
  return request
    .post('/admin/login/')
    .send({ email: adminUser.email, password: adminUser.password }).timeout(10000)
    .expect(200);
};

export const genTokenDef = async () => {
  return request
    .post('/cnxTable/genToken')
    .set({ 'content-type': 'application/x-www-form-urlencoded' })
    .send({ idTable: 1 })
    .expect(200);
};
