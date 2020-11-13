const chai = require('chai')
const { it, describe, afterEach, after, before, beforeEach } = require('mocha');
const assert = chai.assert;
const jwt = require('jsonwebtoken');
// Application imports
const server = require("../index");
const Todo = require("../models/todo");
const User = require("../models/users");

const context = {
  app: null,
  token: null,
  user: null,
}

describe("API: todo", async function () {

  before(async function () {
    chai.use(require("chai-http"));
    context.app = await server.main();
  });

  beforeEach(async function () {
    context.user = JSON.parse(JSON.stringify(await User.create({
      name: "some user",
      password: "password",
      email: "user@example.com",
    })));
    context.token = jwt.sign(context.user, process.env.API_SECRET, { expiresIn: '1h' });
  })

  afterEach(async function () {
    await Todo.sqlModel.destroy({ truncate: true });
    await User.sqlModel.destroy({ truncate: true });
  });

  after(async function () {
    context.app.close();
  });

  describe("GET:/todo", async function () {
    it("should return a 200 status for get /todo", async function () {
      const todo = await Todo.sqlModel.create({task: 'test-task'})
      const response = await chai.request(context.app).get('/todo')
        .set('Authorization', `Bearer ${context.token}`);

      assert.equal(response.status, 200);
      assert.exists(response.body);
      assert.isNotEmpty(response.body);
      assert.equal(response.body[0].id, todo.id);
      assert.equal(response.body[0].task, 'test-task');
    });
  });
  
  describe("GET:/todo/:id", async function () {
    it("should return a 200 status for get /todo/:id", async function () {
      const todo = await Todo.sqlModel.create({task: 'test-task', userId: context.user.id});
      const response = await chai.request(context.app).get(`/todo/${todo.id}`)
        .set('Authorization', `Bearer ${context.token}`);;

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
        .send({task: 'do something'})
        .set('Authorization', `Bearer ${context.token}`);
      assert.equal(response.status, 201);
      assert.equal(response.body.task, 'do something');
      assert.equal(response.body.completed, false);
    });
  });

  describe("PUT:/todo/:id", async function () {
    it("should return a 200 status for put /todo/:id", async function () {
      const todo = await Todo.sqlModel.create({task: 'test-task', userId: context.user.id});

      const response = await chai.request(context.app)
        .put(`/todo/${todo.id}`)
        .send({completed: true})
        .set('Authorization', `Bearer ${context.token}`);
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
        .del(`/todo/${todo.id}`)
        .set('Authorization', `Bearer ${context.token}`);
      assert.equal(response.status, 200);
      assert.isEmpty(response.body);
    });
  });
  
});
