const { use } = require('chai');
const chai = require('chai')
const { it, describe, afterEach, before } = require('mocha');
const moment = require('moment');
const assert = chai.assert;
// Application imports
const { Todo, User, sequelize } = require("../database");
const TodoModel = require("../models/todo");

describe("MODEL: todo", async function () {

  before(async function () {
    await sequelize.sync();
  });

  afterEach(async function () {
    await Todo.destroy({ truncate: true });
    await User.destroy({ truncate: true });
  });

  describe("list", async function () {
    it("should return a list of todos", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      // // Cool potential problem here, sequelize returns the db entry before it is written to disk.
      // //  this means that the timestamps are generate within 1ms from one another resulting in the 
      // //  same timestamps being generated for these two entries
      // //  This test relies on them being created one after the other with distinct different timestamps.
      // //  This will fail intermittently.
      // const todoOne = await Todo.create({task: 'not-completed'});
      // const todoTwo = await Todo.create({task: 'is-complete', completed: true});
      
      const todoOne = await Todo.create({task: 'not-completed', createdAt: moment().subtract(1, 'minute').toDate()});
      const todoTwo = await Todo.create({task: 'is-complete', completed: true});

      const todos = await TodoModel.list(user);

      assert.exists(todos[0]);
      assert.exists(todos[1]);
      assert.equal(todos[1].task, todoOne.task);
      assert.equal(todos[0].task, todoTwo.task);
      assert.isFalse(todos[1].completed);
      assert.isTrue(todos[0].completed);
    });
  });

  describe("get", async function () {
    it("should return a single todo", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      const todo = await Todo.create({task: 'something', userId: user.id});

      const found = await TodoModel.get(todo.id, user);
      assert.equal(todo.id, found.id);
    });

    it("should throw an error for id not being a string", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      try {
        await TodoModel.get(1, user);
      } catch (e) {
        assert.exists(e);
        assert.isTrue(e.message.indexOf('id needs to be a string') > -1);
        return;
      }
      assert.fail('get(1) should throw an error for not being a string');
    });
  });

  describe("create", async function () {
    it("should create a todo", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      const todo = await TodoModel.create({task: 'something'}, user);
      assert.exists(todo.id);
      assert.equal(todo.task, 'something');
      assert.isFalse(todo.completed);
    });

    it("should throw an error for task not being a string", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      try {
        await TodoModel.create({task: 1}, user);
      } catch (e) {
        assert.exists(e);
        assert.isTrue(e.message.indexOf('data.task needs to be set as string') > -1);
        return;
      }
      assert.fail('create({task: 1}) should throw an error for not being a string');
    });
  });

  describe("update", async function () {
    it("should update a todo", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      const todo = await Todo.create({task: 'something', userId: user.id});
      assert.isFalse(todo.completed);

      const updated = await TodoModel.update(todo.id, {completed: true}, user);
      assert.isTrue(updated.completed);
    });

    it("should throw an error for id not being a string", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      try {
        await TodoModel.update(1, {}, user);
      } catch (e) {
        assert.exists(e);
        assert.isTrue(e.message.indexOf('id needs to be a string') > -1);
        return;
      }
      assert.fail('update(1, {}) should throw an error for not being a string');
    });

    it("should throw an error for completed not being a boolean", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      try {
        await TodoModel.update("123", {completed: "true"}, user);
      } catch (e) {
        assert.exists(e);
        assert.isTrue(e.message.indexOf('data.completed should to be a boolean') > -1);
        return;
      }
      assert.fail('update("123", {completed: "true") should throw an error for completed not being a boolean');
    });

    it("should throw an error for taks not being a string", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      try {
        await TodoModel.update("123", {task: 1}, user);
      } catch (e) {
        assert.exists(e);
        assert.isTrue(e.message.indexOf('data.task should be a string') > -1);
        return;
      }
      assert.fail('update("123", {task: 1}) should throw an error for task not being a string');
    })
  });

  describe("destroy", async function () {
    it("should destroy a todo", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      const todo = await Todo.create({task: 'something', userId: user.id});

      await TodoModel.remove(todo.id, user);
      const removed = await Todo.findByPk(todo.id);
      assert.notExists(removed);
    });

    it("should throw an error for id not being a string", async function () {
      const user = await User.create({
        name: "user",
        password: "password",
        email: "user@example.com"
      });
      try {
        await TodoModel.remove(1, user);
      } catch (e) {
        assert.exists(e);
        assert.isTrue(e.message.indexOf('id needs to be a string') > -1);
        return;
      }
      assert.fail('remove(1) should throw an error for id not being a string');
    });
  });
});
