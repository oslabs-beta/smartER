import { Request, Response } from 'supertest';
const server = 'http://localhost:9001';

describe('/api', () => {
  describe('/getQueryResults', () => {
    describe('POST', () => {});
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
