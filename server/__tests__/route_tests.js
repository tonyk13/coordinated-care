const request = require('supertest');
const app = require('../server'); // Adjust the path as needed

// User Verification Route Test
describe('Comments Route', () => {
  it('should respond with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

// Questions Route Test
describe('Questions Route', () => {
  it('should respond with status 200', async () => {
    const response = await request(app).get('/questions');
    expect(response.status).toBe(200);
  });
});

// Tags Route Test
describe('Questions Route', () => {
  it('should respond with status 200', async () => {
    const response = await request(app).get('/tags');
    expect(response.status).toBe(200);
  });
});
