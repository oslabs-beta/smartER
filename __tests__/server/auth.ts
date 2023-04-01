import request from 'supertest';
import app from '../../server/app';

// API Route testing
describe('/api', () => {
  describe('/getQueryResults', () => {
    describe('POST', () => {
      it('responds with 200 status and application/json content type', async () => {
        const res = await request(app)
          .post('/api/getQueryResults')
          .send({ queryString: 'SELECT name from people' });
        expect(res.statusCode).toEqual(200);
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
describe('/', () => {
  it('Should return 404 and status message when sending invalid URL', async () => {
    const res = await request(app).get('/DKLSJA');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      `This is not the page you are looking for ¯\\_(ツ)_/¯`
    );
    return;
  });
});
