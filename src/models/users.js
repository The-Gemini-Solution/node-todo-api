const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../database");

const create = async (data) => {
  const user = {...data};
  if (!_.hasIn(data, 'password') || !_.isString(data.password)) throw new Error('Password is required and should be a string');
  user.password = await bcrypt.hash(user.password, 10);
  user.email = user.email.toLowerCase().trim();
  return User.create(user);
}

const getByEmail = async (email) => {
  return await User.findOne({where: {email}});
}

module.exports = {
  sqlModel: User,
  create,
  getByEmail
}
