import request from 'supertest';
import { app } from '../../server/server';
const PORT = process.env.PORT || 9001;
const server = `http://localhost:${PORT}`;

// API Route testing
describe('/api', () => {
  describe('/getQueryResults', () => {
    describe('POST', () => {
      it('responds with 200 status and application/json content type', async () => {
        const res = await request(app).post('/api/getQueryResults').send({});
        expect(res).toEqual('something');
      });
    });
  });
  describe('/getSchema', () => {
    describe('GET', () => {});
  });
  describe('/getHistory', () => {
    describe('GET', () => {});
  });
  describe('/addURI', () => {
    describe('POST', () => {});
  });
});

// User route testing
describe('/user', () => {
  describe('/emailCheck', () => {
    describe('POST', () => {});
  });

  describe('/signup', () => {
    describe('POST', () => {});
  });

  describe('/login', () => {
    describe('POST', () => {});
  });

  describe('/changePassword', () => {
    describe('POST', () => {});
  });

  describe('/logout', () => {
    describe('POST', () => {});
  });

  describe('/authenticate', () => {
    describe('GET', () => {});
  });
});

// Catch all 404 testing
describe('/', () => {});
