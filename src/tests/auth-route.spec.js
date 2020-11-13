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
}

describe("API: auth", async function () {
  before(async function () {
    chai.use(require("chai-http"));
    context.app = await server.main();
  });

  afterEach(async function () {
    await Todo.sqlModel.destroy({ truncate: true });
    await User.sqlModel.destroy({ truncate: true });
  });

  after(async function () {
    context.app.close();
  });


  describe("POST:/register", async function () {
    it("should return a token for a successful registreation", async function () {
      const response = await chai.request(context.app).post('/register').send({
        name: "user",
        password: "password",
        email: "user@example.com",
      });
      assert.exists(response.body.token);
    });
  });

  describe("POST:/login", async function () {
    it("should log you in when using correct credentials", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      const response = await chai.request(context.app).post('/login').send({
        password: "password",
        email: user.email
      });
      assert.equal(response.status, 200);
      assert.exists(response.body.token);
    });

    it("should not log you in with incorrect credentials", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });

      const response = await chai.request(context.app).post('/login').send({
        password: "password!",
        email: user.email
      });
      assert.equal(response.status, 401);
      assert.exists(response.body.error);
    });
  });
});