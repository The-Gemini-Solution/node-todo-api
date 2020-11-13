const { Todo } = require('../database');
const _ = require('lodash');

// GET /todo
const list = async (user) => {
  return Todo.findAll({order: [['createdAt', 'DESC']], userId: user.id});
};

// GET /todo/:id
const get = async (id, user) => {
  if (!_.isString(id)) throw new Error('id needs to be a string');
  return Todo.findOne({where: {id, userId: user.id}});
};

// POST /todo
const create = async (data, user) => {
  if (!_.hasIn(data, 'task') || !_.isString(data.task)) throw new Error('data.task needs to be set as string');
  return Todo.create({task: data.task, userId: user.id});
};

// PUT /todo/:id
const update = async (id, data, user) => {
  if (!_.isString(id)) throw new Error('id needs to be a string');
  if (_.hasIn(data, 'task') && !_.isString(data.task)) throw new Error('data.task should be a string');
  if (_.hasIn(data, 'completed') && !_.isBoolean(data.completed)) throw new Error('data.completed should to be a boolean');
  await Todo.update({...data}, {where: {id, userId: user.id}});
  return Todo.findOne({where: {id, userId: user.id}})
};

// DELETE /todo/:id
const remove = async (id, user) => {
  if (!_.isString(id)) throw new Error('id needs to be a string');
  return Todo.destroy({where: {id, userId: user.id}});
};

module.exports = { sqlModel: Todo, list, get, create, update, remove };
