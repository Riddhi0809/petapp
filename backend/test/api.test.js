require('dotenv').config({ path: './.env' });

const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../app');

describe('Pawmise API', function () {

  before(async function () {
    this.timeout(20000);
    await mongoose.connect(process.env.MONGO_URI);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('GET / should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
  });

  it('GET /api/board should respond', async () => {
    const res = await request(app).get('/api/board');
    expect(res.status).to.be.oneOf([200, 404]);
  });

});
