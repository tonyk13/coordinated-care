const express = require("express");
const request = require("supertest");
const router = require("../routes/processes"); // Import the router
const processesController = require("../controllers/processesController");
const app = express();
app.use("/", router);

processesController.all_processes = jest.fn((req, res) => {
  res.sendStatus(200);
});

describe('GET /processes', () => {
  it('should respond with status 200', async () => {
    const response = await request(app).get('/processes');
    expect(response.status).toBe(200);
  });
});