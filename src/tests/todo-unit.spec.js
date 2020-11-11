const chai = require('chai')
const { it, describe, afterEach } = require('mocha');
const assert = chai.assert;
// Application imports
const Todo = require("../models/todo");

describe("MODEL: todo", async function () {

  afterEach(async function () {
    await Todo.sqlModel.destroy({ truncate: true });
  });

  describe("list", async function () {
    it("should return a list of todos", async function () {
      const todoOne = await Todo.sqlModel.create({task: 'not-completed'});
      const todoTwo = await Todo.sqlModel.create({task: 'is-completed', completed: true});

      const todos = await Todo.list();

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
      const todo = await Todo.sqlModel.create({task: 'something'});

      const found = await Todo.get(todo.id);
      assert.equal(todo.id, found.id);
    });

    it("should throw an error for id not being a string", async function () {
      try {
        await Todo.get(1);
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
      const todo = await Todo.create({task: 'something'});

      assert.exists(todo.id);
      assert.equal(todo.task, 'something');
      assert.isFalse(todo.completed);
    });

    it("should throw an error for task not being a string", async function () {
      try {
        await Todo.create({task: 1});
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
      const todo = await Todo.sqlModel.create({task: 'something'});
      assert.isFalse(todo.completed);

      const updated = await Todo.update(todo.id, {completed: true});
      assert.isTrue(updated.completed);
    });

    it("should throw an error for id not being a string", async function () {
      try {
        await Todo.update(1, {});
      } catch (e) {
        assert.exists(e);
        assert.isTrue(e.message.indexOf('id needs to be a string') > -1);
        return;
      }
      assert.fail('update(1, {}) should throw an error for not being a string');
    });

    it("should throw an error for completed not being a boolean", async function () {
      try {
        await Todo.update("123", {completed: "true"});
      } catch (e) {
        assert.exists(e);
        assert.isTrue(e.message.indexOf('data.completed should to be a boolean') > -1);
        return;
      }
      assert.fail('update("123", {completed: "true") should throw an error for completed not being a boolean');
    });

    it("should throw an error for taks not being a string", async function () {
      try {
        await Todo.update("123", {task: 1});
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
      const todo = await Todo.sqlModel.create({task: 'something'});

      await Todo.remove(todo.id);
      const removed = await Todo.sqlModel.findByPk(todo.id);
      assert.notExists(removed);
    });

    it("should throw an error for id not being a string", async function () {
      try {
        await Todo.remove(1);
      } catch (e) {
        assert.exists(e);
        assert.isTrue(e.message.indexOf('id needs to be a string') > -1);
        return;
      }
      assert.fail('remove(1) should throw an error for id not being a string');
    });
  });
});
