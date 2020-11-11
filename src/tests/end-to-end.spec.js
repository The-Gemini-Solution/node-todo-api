const chai = require('chai')
const { it, describe, afterEach, after, before } = require('mocha');
const assert = chai.assert;
// Application imports
const server = require("../index");
const Todo = require("../models/todo");
const { Sequelize } = require('sequelize');

const context = {
  app: null,
}

describe("API: todo", async function () {

  before(async function () {
    chai.use(require("chai-http"));
    context.app = await server.main();
  });

  afterEach(async function () {
    await Todo.sqlModel.destroy({ truncate: true });
  });

  after(async function () {
    context.app.close();
  });

  describe("GET:/todo", async function () {
    it("should return a 200 status for get /todo", async function () {
      const todo = await Todo.sqlModel.create({task: 'test-task'});
      const response = await chai.request(context.app).get('/todo');

      assert.equal(response.status, 200);
      assert.exists(response.body);
      assert.isNotEmpty(response.body);
      assert.equal(response.body[0].id, todo.id);
      assert.equal(response.body[0].task, 'test-task');
    });
  });
  
  describe("GET:/todo/:id", async function () {
    it("should return a 200 status for get /todo/:id", async function () {
      const todo = await Todo.sqlModel.create({task: 'test-task'});
      const response = await chai.request(context.app).get(`/todo/${todo.id}`);

      assert.equal(response.status, 200);
      assert.exists(response.body);
      assert.isNotEmpty(response.body);
      assert.equal(response.body.id, todo.id);
      assert.equal(response.body.task, 'test-task');
    });
  });

  describe("POST:/todo", async function () {
    it("should return a 201 status for post /todo/:id", async function () {
      const response = await chai.request(context.app)
        .post('/todo')
        .send({task: 'do something'});
      assert.equal(response.status, 201);
      assert.equal(response.body.task, 'do something');
      assert.equal(response.body.completed, false);
    });
  });

  describe("PUT:/todo/:id", async function () {
    it("should return a 200 status for put /todo/:id", async function () {
      const todo = await Todo.sqlModel.create({task: 'test-task'});

      const response = await chai.request(context.app)
        .put(`/todo/${todo.id}`)
        .send({completed: true});
      assert.equal(response.status, 200);
      assert.equal(response.body.task, 'test-task');
      assert.equal(response.body.completed, true);
      assert.notEqual(response.body.createdAt, response.body.updatedAt);
    });
  });

  describe("DELETE:/todo/:id", async function () {
    it("should return a 200 status for delete /todo/:id", async function () {
      const todo = await Todo.sqlModel.create({task: 'test-task'});

      const response = await chai.request(context.app)
        .del(`/todo/${todo.id}`);
      assert.equal(response.status, 200);
      assert.isEmpty(response.body);
    });
  });
  
});
