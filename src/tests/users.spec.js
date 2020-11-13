const chai = require('chai')
const { it, describe, afterEach, before } = require('mocha');
const assert = chai.assert;
// Application imports
const { User, sequelize } = require("../database");
const UserModel = require("../models/users");

describe("MODEL: user", async function () {

  before(async function () {
    await sequelize.sync();
  });

  afterEach(async function () {
    await User.destroy({ truncate: true });
  });

  describe("create", async function () {
    it("should create a user and hash the password", async function () {
      const user = await UserModel.create({
        name: "test user",
        email: "test@example.com",
        password: "password"
      });
      assert.exists(user.id);
      assert.equal(user.name, "test user");
      assert.equal(user.email, "test@example.com");
      assert.exists(user.password);
      assert.notEqual(user.password, "password");
    });

    it("should throw an error if the password is not a string", async function () {
      try {
        await UserModel.create({
          name: "test user",
          email: "test@example.com",
          password: 1
        });
      } catch (e) {
        assert.exists(e);
        assert.isTrue(e.message.indexOf('Password is required and should be a string') > -1);
        return;
      }
      assert.fail('create() should throw and error for password being a string');
    });
  });

  describe("getByEmail", async function () {
    it("should return user by email address", async function () {
      const userCreated = await User.create({name: "example", email: "user@example.com", password: "password"});
      const user = await UserModel.getByEmail(userCreated.email);
      assert.exists(user);
      assert.equal(user.email, userCreated.email);
      assert.equal(user.name, userCreated.name);
      assert.equal(user.password, user.password);
    });
  });
});
