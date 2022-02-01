/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);

describe('Test Routes', () => {
  describe('GET /videogames', () => {
    it('responds with and object with videogames', () => {
        agent.get('/videogames')
        .then((res) => {
          expect(res.body).to.be.an('array');
        })
    });
  });
  
})