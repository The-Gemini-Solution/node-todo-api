const KoaRouter = require("koa-router");
const router = new KoaRouter();
const todo = require("../models/todo");

router.get("/todo", async (ctx, next) => {
  ctx.body = await todo.list(ctx.state.user);
});

router.get("/todo/:id", async (ctx, next) => {
  ctx.body = await todo.get(ctx.params.id, ctx.state.user);
});

router.post("/todo", async (ctx, next) => {
  ctx.body = await todo.create(ctx.request.body, ctx.state.user);
  ctx.status = 201;
});

router.put("/todo/:id", async (ctx, next) => {
  ctx.body = await todo.update(ctx.params.id, ctx.request.body, ctx.state.user);
});

router.del("/todo/:id", async (ctx, next) => {
  ctx.body = todo.remove(ctx.state.user);
});

module.exports = router;