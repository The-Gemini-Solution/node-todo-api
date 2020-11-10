const chai = require('chai')
const chaiHttp = require('chai-http'); 
const { it, describe, beforeEach, afterEach, after, before } = require('mocha');
const sinon = require("sinon");
const assert = chai.assert;
// Application endpoints
const server = require("../index");

const context = {
  app: null,
}

describe("API: todo", async function () {

  before(async function () {
    chai.use(require("chai-http"));
    context.app = await server.main();
  });

  beforeEach(async function () {

  });

  afterEach(async function () {

  });

  after(async function () {
    context.app.close();
  });

  describe("GET:/todo", async function () {
    it("should return a 200 status for get /todo", async function () {
      const response = await chai.request(context.app).get('/todo');
      assert.equal(response.status, 200);
    });
  });
  
  describe("GET:/todo/:id", async function () {
    it("should return a 200 status for get /todo/:id", async function () {
      const response = await chai.request(context.app).get('/todo/1');
      assert.equal(response.status, 200);
    });
  });

  describe("POST:/todo", async function () {
    it("should return a 201 status for post /todo/:id", async function () {
      const response = await chai.request(context.app)
        .post('/todo')
        .send({key: 'value'});
      assert.equal(response.status, 201);
    });
  });

  describe("PUT:/todo/:id", async function () {
    it("should return a 200 status for put /todo/:id", async function () {
      const response = await chai.request(context.app)
        .put('/todo/1')
        .send({key: 'value'});
      assert.equal(response.status, 200);
    });
  });

  describe("DELETE:/todo/:id", async function () {
    it("should return a 200 status for put /todo/:id", async function () {
      const response = await chai.request(context.app)
        .del('/todo/1')
        .send({key: 'value'});
      assert.equal(response.status, 200);
    });
  });
  
});
