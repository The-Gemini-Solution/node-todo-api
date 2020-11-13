const { Todo } = require('../database');
const _ = require('lodash');

// GET /todo
const list = async () => {
  return Todo.findAll({order: [['createdAt', 'DESC']]});
};

// GET /todo/:id
const get = async (id) => {
  if (!_.isString(id)) throw new Error('id needs to be a string');
  return Todo.findByPk(id);
};

// POST /todo
const create = async (data) => {
  if (!_.hasIn(data, 'task') || !_.isString(data.task)) throw new Error('data.task needs to be set as string');
  return Todo.create({task: data.task});
};

// PUT /todo/:id
const update = async (id, data) => {
  if (!_.isString(id)) throw new Error('id needs to be a string');
  if (_.hasIn(data, 'task') && !_.isString(data.task)) throw new Error('data.task should be a string');
  if (_.hasIn(data, 'completed') && !_.isBoolean(data.completed)) throw new Error('data.completed should to be a boolean');
  await Todo.update({...data}, {where: {id}});
  return Todo.findByPk(id)
};

// DELETE /todo/:id
const remove = async (id) => {
  if (!_.isString(id)) throw new Error('id needs to be a string');
  return Todo.destroy({where: {id}});
};

module.exports = { sqlModel: Todo, list, get, create, update, remove };
