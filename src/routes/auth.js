const KoaRouter = require("koa-router");
const bcrypt = require("bcrypt");
const router = new KoaRouter();
const jwt = require('jsonwebtoken');

const User = require("../models/users");

router.post("/register", async (ctx, next) => {
  const user = await User.create(ctx.request.body);
  const token = await jwt.sign(JSON.parse(JSON.stringify(user)), process.env.API_SECRET, { expiresIn: '1h' });
  ctx.body = { token }
});

router.post("/login", async (ctx, next) => {
  const user = await User.getByEmail(ctx.request.body.email);
  const isValid = await bcrypt.compare(ctx.request.body.password, user.password);
  if (isValid) {
    return ctx.body = {
      token: jwt.sign(JSON.parse(JSON.stringify(user)), process.env.API_SECRET, { expiresIn: '1h' })
    }
  }
  ctx.status = 401;
  ctx.body = {error: "Incorrect login credentials"};
});

module.exports = router;