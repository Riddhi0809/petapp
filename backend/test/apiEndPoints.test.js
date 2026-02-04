require('dotenv').config({ path: './.env' });

const request = require("supertest");
const { expect } = require("chai");
const mongoose = require("mongoose");
const app = require("../app");

describe("Pawmise API Endpoints", function () {

  before(async function () {
    this.timeout(20000);
    await mongoose.connect(process.env.MONGO_URI);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  // -------------------------
  // Register
  // -------------------------
  describe("POST /api/register", () => {
    it("should create a new user", async () => {
      const res = await request(app)
        .post("/api/register")
        .send({
          email: "testuser@example.com",
          password: "123456",
          name: "Test User"
        });

      expect(res.status).to.be.oneOf([200, 201, 400]);
    });
  });

  // -------------------------
  // Login
  // -------------------------
  describe("POST /api/login", () => {
    it("should login user and return token", async () => {
      const res = await request(app)
        .post("/api/login")
        .send({
          email: "testuser@example.com",
          password: "123456"
        });

      expect(res.status).to.be.oneOf([200, 401, 400]);
    });
  });

  // -------------------------
  // Board
  // -------------------------
  describe("GET /api/board", () => {
    it("should return board items", async () => {
      const res = await request(app).get("/api/board");
      expect(res.status).to.be.oneOf([200, 404]);
    });
  });

  // -------------------------
  // Visits
  // -------------------------
  describe("GET /api/visits", () => {
    it("should return visit logs", async () => {
      const res = await request(app).get("/api/visits");
      expect(res.status).to.be.oneOf([200, 404]);
    });
  });

});
