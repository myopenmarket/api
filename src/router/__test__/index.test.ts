import request from 'supertest';
import { startTestApp, stopTestApp } from '~/tests/setup/in-memory-app';

let app;

beforeAll(async () => {
  app = await startTestApp();
});

describe('Request GET /', () => {
  it('returns application status', async () => {
    await request(app.callback())
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.state).toBeDefined();
      });
  });
});

afterAll(async () => {
  app = await stopTestApp();
});
